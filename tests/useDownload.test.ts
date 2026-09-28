import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { createElement, ReactNode } from "react";
import { LoginGuardCallback } from "../src/providers/loginGuard/common/types";
import { LoginGuardContext } from "../src/providers/loginGuard/context";

jest.unstable_mockModule("../src/hooks/useFileLocation", () => ({
  useFileLocation: jest.fn(),
}));

const { useDownload } =
  await import("../src/components/Index/components/AzulFileDownload/hooks/UseDownload/hook");
const { useFileLocation } = await import("../src/hooks/useFileLocation");

describe("useDownload", () => {
  const FILE_URL = "https://example.com/storage/file";
  const FILE_LOCATION = { location: FILE_URL, status: 302 };
  const MOCK_RUN = jest.fn();
  const OTHER_URL = "https://example.com/repository/other-file";
  const URL = "https://example.com/repository/file";
  const PROPS = {
    entityName: "filename.extension",
    relatedEntityId: "id",
    relatedEntityName: "name",
    url: URL,
  };

  /**
   * Attaches an anchor to the hook's download ref, standing in for the hidden
   * anchor the component renders. Without it the download effect bails.
   * @param downloadRef - The hook's download ref.
   * @param downloadRef.current - The attached anchor, or null before attaching.
   * @returns The attached anchor element.
   */
  function attachAnchor(downloadRef: {
    current: HTMLAnchorElement | null;
  }): HTMLAnchorElement {
    const anchorEl = document.createElement("a");
    jest.spyOn(anchorEl, "click").mockImplementation(() => undefined);
    downloadRef.current = anchorEl;
    return anchorEl;
  }

  /**
   * Sets the state returned by the mocked useFileLocation.
   * @param state - File location state.
   * @param state.data - Resolved file location, if any.
   * @param state.isLoading - True while the location request is in flight.
   * @param run - Run function returned by the hook; defaults to MOCK_RUN.
   */
  function mockFileLocation(
    state: {
      data?: typeof FILE_LOCATION;
      isLoading: boolean;
    },
    run = MOCK_RUN,
  ): void {
    // Like useFileLocation, fileUrl mirrors the resolved location.
    (useFileLocation as jest.Mock).mockReturnValue({
      ...state,
      fileUrl: state.data?.location,
      run,
    });
  }

  beforeEach(() => {
    mockFileLocation({ data: undefined, isLoading: false });
    // Like useAsync, running the request marks it pending and keeps the
    // previous resolution's data until the new one arrives.
    MOCK_RUN.mockImplementation(() => {
      const { data } = (useFileLocation as jest.Mock)() as {
        data?: typeof FILE_LOCATION;
      };
      mockFileLocation({ data, isLoading: true });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should start idle", () => {
    const { result } = renderHook(() => useDownload(PROPS));
    expect(result.current.isRequestPending).toBe(false);
  });

  it("should request the file location and mark the request pending", () => {
    const { rerender, result } = renderHook(() => useDownload(PROPS));
    act(() => result.current.onDownload());
    act(() => rerender());
    expect(MOCK_RUN).toHaveBeenCalledTimes(1);
    expect(result.current.isRequestPending).toBe(true);
  });

  it("should ignore a download requested while the request is in flight", () => {
    const { rerender, result } = renderHook(() => useDownload(PROPS));
    act(() => result.current.onDownload());
    act(() => rerender());
    act(() => result.current.onDownload());
    expect(MOCK_RUN).toHaveBeenCalledTimes(1);
  });

  it("should request the location again for each activation dispatched within a single task", () => {
    const { result } = renderHook(() => useDownload(PROPS));
    // No rerender between the two: both read the same idle render state, so
    // the isLoading guard lets both through. Accepted; see onDownload's JSDoc.
    act(() => {
      result.current.onDownload();
      result.current.onDownload();
    });
    expect(MOCK_RUN).toHaveBeenCalledTimes(2);
  });

  it("should start the download and return to idle once the location resolves", () => {
    const { rerender, result } = renderHook(() => useDownload(PROPS));
    const anchorEl = attachAnchor(result.current.downloadRef);
    act(() => result.current.onDownload());
    act(() => rerender());
    expect(result.current.isRequestPending).toBe(true);
    // The location request resolves.
    mockFileLocation({ data: FILE_LOCATION, isLoading: false });
    act(() => rerender());
    expect(anchorEl.href).toBe(FILE_URL);
    expect(anchorEl.click).toHaveBeenCalledTimes(1);
    expect(result.current.isRequestPending).toBe(false);
  });

  it("should accept a further download once the previous one has started", () => {
    const { rerender, result } = renderHook(() => useDownload(PROPS));
    attachAnchor(result.current.downloadRef);
    act(() => result.current.onDownload());
    mockFileLocation({ data: FILE_LOCATION, isLoading: false });
    act(() => rerender());
    act(() => result.current.onDownload());
    act(() => rerender());
    expect(MOCK_RUN).toHaveBeenCalledTimes(2);
    expect(result.current.isRequestPending).toBe(true);
  });

  it("should not start a download while the location is unresolved", () => {
    const { rerender, result } = renderHook(() => useDownload(PROPS));
    const anchorEl = attachAnchor(result.current.downloadRef);
    act(() => result.current.onDownload());
    act(() => rerender());
    expect(anchorEl.click).not.toHaveBeenCalled();
    expect(result.current.isRequestPending).toBe(true);
  });

  it("should run the latest request when the login guard defers the download", () => {
    // Stands in for LoginGuardProvider while the user is logged out: the
    // callback is stored and called after login, from a later render.
    let deferredCallback: LoginGuardCallback | undefined;
    const requireLogin = (callback?: LoginGuardCallback): void => {
      deferredCallback = callback;
    };
    const { rerender, result } = renderHook(() => useDownload(PROPS), {
      wrapper: ({ children }: { children: ReactNode }) =>
        createElement(
          LoginGuardContext.Provider,
          { value: { requireLogin } },
          children,
        ),
    });
    act(() => result.current.onDownload());
    expect(MOCK_RUN).not.toHaveBeenCalled();
    // Login updates the token, so useFileLocation hands back a new run.
    const runAfterLogin = jest.fn();
    mockFileLocation({ data: undefined, isLoading: false }, runAfterLogin);
    act(() => rerender());
    act(() => deferredCallback?.());
    expect(runAfterLogin).toHaveBeenCalledTimes(1);
    expect(MOCK_RUN).not.toHaveBeenCalled();
  });

  it("should download again when a later request resolves to the same location", () => {
    const { rerender, result } = renderHook(() => useDownload(PROPS));
    const anchorEl = attachAnchor(result.current.downloadRef);
    act(() => result.current.onDownload());
    mockFileLocation({ data: { ...FILE_LOCATION }, isLoading: false });
    act(() => rerender());
    act(() => result.current.onDownload());
    act(() => rerender());
    // A new resolution with an identical location.
    mockFileLocation({ data: { ...FILE_LOCATION }, isLoading: false });
    act(() => rerender());
    expect(anchorEl.click).toHaveBeenCalledTimes(2);
  });

  it.each([
    ["changes", OTHER_URL],
    ["is removed", undefined],
  ])(
    "should not download when the URL %s while the request is in flight",
    (_, nextUrl) => {
      const { rerender, result } = renderHook(
        ({ url }: { url?: string }) => useDownload({ ...PROPS, url }),
        { initialProps: { url: URL as string | undefined } },
      );
      const anchorEl = attachAnchor(result.current.downloadRef);
      act(() => result.current.onDownload());
      act(() => rerender({ url: nextUrl }));
      // The request for the original URL resolves.
      mockFileLocation({ data: FILE_LOCATION, isLoading: false });
      act(() => rerender({ url: nextUrl }));
      expect(anchorEl.click).not.toHaveBeenCalled();
    },
  );
});

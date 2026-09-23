import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

jest.unstable_mockModule("../src/hooks/useFileLocation", () => ({
  useFileLocation: jest.fn(),
}));

const { useDownload } =
  await import("../src/components/Index/components/AzulFileDownload/hooks/UseDownload/hook");
const { useFileLocation } = await import("../src/hooks/useFileLocation");

describe("useDownload", () => {
  const FILE_URL = "https://example.com/storage/file";
  const MOCK_RUN = jest.fn();
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

  beforeEach(() => {
    (useFileLocation as jest.Mock).mockReturnValue({
      fileUrl: undefined,
      run: MOCK_RUN,
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
    const { result } = renderHook(() => useDownload(PROPS));
    act(() => result.current.onDownload());
    expect(MOCK_RUN).toHaveBeenCalledTimes(1);
    expect(result.current.isRequestPending).toBe(true);
  });

  it("should ignore a download requested while the request is in flight", () => {
    const { result } = renderHook(() => useDownload(PROPS));
    act(() => result.current.onDownload());
    act(() => result.current.onDownload());
    expect(MOCK_RUN).toHaveBeenCalledTimes(1);
  });

  it("should start the download and return to idle once the location resolves", () => {
    const { rerender, result } = renderHook(() => useDownload(PROPS));
    const anchorEl = attachAnchor(result.current.downloadRef);
    act(() => result.current.onDownload());
    expect(result.current.isRequestPending).toBe(true);
    // The location request resolves.
    (useFileLocation as jest.Mock).mockReturnValue({
      fileUrl: FILE_URL,
      run: MOCK_RUN,
    });
    act(() => rerender());
    expect(anchorEl.href).toBe(FILE_URL);
    expect(anchorEl.click).toHaveBeenCalledTimes(1);
    expect(result.current.isRequestPending).toBe(false);
  });

  it("should accept a further download once the previous one has started", () => {
    const { rerender, result } = renderHook(() => useDownload(PROPS));
    attachAnchor(result.current.downloadRef);
    act(() => result.current.onDownload());
    (useFileLocation as jest.Mock).mockReturnValue({
      fileUrl: FILE_URL,
      run: MOCK_RUN,
    });
    act(() => rerender());
    act(() => result.current.onDownload());
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
});

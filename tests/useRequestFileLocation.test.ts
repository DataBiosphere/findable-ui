import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { useEffect } from "react";
import {
  FILE_LOCATION_PENDING,
  FILE_LOCATION_SUCCESSFULLY,
} from "../src/apis/azul/common/constants";

jest.unstable_mockModule("../src/hooks/authentication/token/useToken", () => ({
  useToken: jest.fn(),
}));

const { useToken } = await import("../src/hooks/authentication/token/useToken");
const { useRequestFileLocation } =
  await import("../src/hooks/useRequestFileLocation");

const DOWNLOAD_URL = "https://example.com/download";
const REQUEST_URL = "https://example.com/file-location";
const RETRY_URL = "https://example.com/retry-location";
const originalFetch = global.fetch;

const MOCK_USE_TOKEN = useToken as jest.MockedFunction<typeof useToken>;

describe("useRequestFileLocation", () => {
  beforeEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    global.fetch = originalFetch;
    MOCK_USE_TOKEN.mockReset();
    MOCK_USE_TOKEN.mockReturnValue({ token: undefined });
  });

  afterEach(() => {
    jest.useRealTimers();
    global.fetch = originalFetch;
  });

  it("uses the latest token when a stale run callback is invoked after a token change", async () => {
    jest.useFakeTimers();
    const fetchMock = jest.fn().mockResolvedValue(createFileLocationResponse());
    global.fetch = fetchMock as typeof fetch;

    const tokenState: { current: string | undefined } = { current: undefined };
    MOCK_USE_TOKEN.mockImplementation(() => ({ token: tokenState.current }));

    const { rerender, result } = renderHook(() =>
      useRequestFileLocation(REQUEST_URL),
    );
    const staleRun = result.current.run;

    tokenState.current = "new-token";
    rerender();

    act(() => {
      staleRun();
    });
    await flushScheduledRequest();

    expect(fetchMock).toHaveBeenCalledWith(
      REQUEST_URL,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: ["Bearer", tokenState.current].join(" "),
        }),
      }),
    );
  });

  it("changes run identity and re-requests when the token becomes available", async () => {
    jest.useFakeTimers();
    const fetchMock = jest.fn().mockResolvedValue(createFileLocationResponse());
    global.fetch = fetchMock as typeof fetch;

    const tokenState: { current: string | undefined } = { current: undefined };
    MOCK_USE_TOKEN.mockImplementation(() => ({ token: tokenState.current }));

    const { rerender, result } = renderHook(() => {
      const requestFileLocation = useRequestFileLocation(REQUEST_URL);
      const { run } = requestFileLocation;

      useEffect(() => {
        run();
      }, [run]);

      return requestFileLocation;
    });

    const initialRun = result.current.run;

    await flushScheduledRequest();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    tokenState.current = "new-token";
    rerender();

    expect(result.current.run).not.toBe(initialRun);

    await flushScheduledRequest();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      REQUEST_URL,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: ["Bearer", tokenState.current].join(" "),
        }),
      }),
    );
  });

  it("uses the latest token for retry polls", async () => {
    jest.useFakeTimers();
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(
        createFileLocationResponse({
          Location: RETRY_URL,
          "Retry-After": 1,
          Status: FILE_LOCATION_PENDING,
        }),
      )
      .mockResolvedValueOnce(createFileLocationResponse());
    global.fetch = fetchMock as typeof fetch;

    const tokenState: { current: string | undefined } = { current: "token-1" };
    MOCK_USE_TOKEN.mockImplementation(() => ({ token: tokenState.current }));

    const { rerender, result } = renderHook(() =>
      useRequestFileLocation(REQUEST_URL),
    );

    act(() => {
      result.current.run();
    });
    await flushScheduledRequest();

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      REQUEST_URL,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: ["Bearer", "token-1"].join(" "),
        }),
      }),
    );

    tokenState.current = "token-2";
    rerender();

    await flushScheduledRequest(1000);

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      RETRY_URL,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: ["Bearer", "token-2"].join(" "),
        }),
      }),
    );
  });
});

/**
 * Flushes scheduled timers and pending promises for file location requests.
 * @param timeoutMs - Time to advance before draining pending promises.
 * @returns A promise that resolves once pending request work has completed.
 */
async function flushScheduledRequest(timeoutMs = 0): Promise<void> {
  await act(async () => {
    if (timeoutMs > 0) {
      jest.advanceTimersByTime(timeoutMs);
    } else {
      jest.runOnlyPendingTimers();
    }
    await Promise.resolve();
    await Promise.resolve();
  });
}

/**
 * Creates a mock file location fetch response.
 * @param response - Partial file location payload to merge with the default success response.
 * @returns A resolved fetch response with a file location payload.
 */
function createFileLocationResponse(
  response: Partial<{
    Location: string;
    "Retry-After": number;
    Status: number;
  }> = {},
): Response {
  return {
    json: async () => ({
      Location: DOWNLOAD_URL,
      Status: FILE_LOCATION_SUCCESSFULLY,
      ...response,
    }),
  } as Response;
}

import { jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";

jest.unstable_mockModule("../src/shared/utils", () => ({
  getURL: (): string => "http://example.com",
}));

const actualSetTimeout = setTimeout;

const mockSetTimeout = jest
  .spyOn(globalThis, "setTimeout")
  .mockImplementation(((callback: () => void, timeout: number) => {
    if (timeout === 20000) actualSetTimeout(callback, timeout);
    else callback();
  }) as typeof setTimeout);

let fetchApi: typeof import("../src/entity/common/client").fetchApi;

beforeAll(async () => {
  fetchMock.doMock();
  globalThis.fetch = ((...args) => {
    return fetchMock(...(args as Parameters<typeof fetchMock>));
  }) as typeof fetch;
  AbortSignal.prototype.throwIfAborted = function (): void {
    if (this.aborted) throw this.reason;
  };
  ({ fetchApi } = await import("../src/entity/common/client"));
});

describe("api", () => {
  it("returns immediately-successful response", async () => {
    fetchMock.mockResponseOnce("immediately-successful");
    const res = await fetchApi("");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("immediately-successful");
  });

  it("returns response after backing off from three 503 responses", async () => {
    mockSetTimeout.mockClear();

    fetchMock.mockResponseOnce("", { status: 503 });
    fetchMock.mockResponseOnce("", { status: 503 });
    fetchMock.mockResponseOnce("", { status: 503 });
    fetchMock.mockResponseOnce("after-three-503");
    const res = await fetchApi("");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("after-three-503");

    expect(mockSetTimeout).toBeCalledTimes(7);
    expect(mockSetTimeout.mock.calls[1][1]).toBe(1000);
    expect(mockSetTimeout.mock.calls[3][1]).toBe(3000);
    expect(mockSetTimeout.mock.calls[5][1]).toBe(9000);
  });

  it("throws error after four 503 responses", async () => {
    mockSetTimeout.mockClear();

    fetchMock.mockResponseOnce("", { status: 503 });
    fetchMock.mockResponseOnce("", { status: 503 });
    fetchMock.mockResponseOnce("", { status: 503 });
    fetchMock.mockResponseOnce("", { status: 503 });
    const error = await fetchApi("").catch((e) => e);
    expect(error).toMatchObject({ response: { status: 503 } });

    expect(mockSetTimeout).toBeCalledTimes(7);
  });

  it("throws error after one 503 response and one 400 response", async () => {
    mockSetTimeout.mockClear();

    fetchMock.mockResponseOnce("", { status: 503 });
    fetchMock.mockResponseOnce("", { status: 400 });
    const error = await fetchApi("").catch((e) => e);
    expect(error).toMatchObject({ response: { status: 400 } });

    expect(mockSetTimeout).toBeCalledTimes(3);
  });

  it("returns response after delaying based on Retry-After", async () => {
    mockSetTimeout.mockClear();

    fetchMock.mockResponseOnce("", {
      headers: { "Retry-After": "7" },
      status: 503,
    });
    fetchMock.mockResponseOnce("after-retry-after");
    const res = await fetchApi("");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("after-retry-after");

    expect(mockSetTimeout).toBeCalledTimes(3);
    expect(mockSetTimeout.mock.calls[1][1]).toBe(7000);
  });
});

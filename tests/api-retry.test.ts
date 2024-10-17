import { jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";

jest.unstable_mockModule("../src/shared/utils", () => ({
  getURL: (): string => "",
}));

/*
const mockSetTimeout = jest
  .spyOn(globalThis, "setTimeout")
  .mockImplementation(((callback: () => void) => {
    callback();
  }) as typeof setTimeout);
*/

let fetchApi: typeof import("../src/entity/common/client").fetchApi;

beforeAll(async () => {
  fetchMock.doMock();
  globalThis.fetch = fetchMock as typeof fetch;
  /*
  AbortSignal.prototype.throwIfAborted = function (): void {
    if (this.aborted) throw this.reason;
  };
  */
  ({ fetchApi } = await import("../src/entity/common/client"));
});

describe("api", () => {
  it("returns immediately-successful response", async () => {
    // addResponse(200);
    fetchMock.mockResponseOnce("asd");
    const res = await fetchApi("http://example.com");
    console.log(await res.text());
    expect(res).toMatchObject({ status: 200 });
  });

  /*
  it("returns response after backing off from three 503 responses", async () => {
    mockSetTimeout.mockClear();
    const { addResponse, mockInstance } = createMockAxiosInstance();
    mockCreate.mockReturnValueOnce(mockInstance);
    addResponse(503);
    addResponse(503);
    addResponse(503);
    addResponse(200);
    const res = await api("").get("");
    expect(res).toMatchObject({ status: 200 });
    expect(mockSetTimeout).toBeCalledTimes(3);
    expect(mockSetTimeout.mock.calls[0][1]).toBe(1000);
    expect(mockSetTimeout.mock.calls[1][1]).toBe(3000);
    expect(mockSetTimeout.mock.calls[2][1]).toBe(9000);
  });

  it("throws error after four 503 responses", async () => {
    mockSetTimeout.mockClear();
    const { addResponse, mockInstance } = createMockAxiosInstance();
    mockCreate.mockReturnValueOnce(mockInstance);
    addResponse(503);
    addResponse(503);
    addResponse(503);
    addResponse(503);
    const promise = api("").get("");
    const error = await promise.catch((e) => e);
    expect(error).toMatchObject({ response: { status: 503 } });
    expect(mockSetTimeout).toBeCalledTimes(3);
  });

  it("throws error after one 503 response and one 500 response", async () => {
    mockSetTimeout.mockClear();
    const { addResponse, mockInstance } = createMockAxiosInstance();
    mockCreate.mockReturnValueOnce(mockInstance);
    addResponse(503);
    addResponse(500);
    const promise = api("").get("");
    const error = await promise.catch((e) => e);
    expect(error).toMatchObject({ response: { status: 500 } });
    expect(mockSetTimeout).toBeCalledTimes(1);
  });

  it("returns response after delaying based on Retry-After", async () => {
    mockSetTimeout.mockClear();
    const { addResponse, mockInstance } = createMockAxiosInstance();
    mockCreate.mockReturnValueOnce(mockInstance);
    addResponse(503, { "Retry-After": 123 });
    addResponse(200);
    const res = await api("").get("");
    expect(res).toMatchObject({ status: 200 });
    expect(mockSetTimeout).toBeCalledTimes(1);
    expect(mockSetTimeout.mock.calls[0][1]).toBe(123);
  });
  */
});

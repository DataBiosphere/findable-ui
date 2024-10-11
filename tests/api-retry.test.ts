import { api } from "../src/entity/common/client";

interface TestAxiosInstance {
  (): Promise<TestAxiosResponse>;
  get: TestAxiosInstance;
  interceptors: {
    response: {
      use(onFulfilled: TestOnFulfilled, onRejected: TestOnRejected): void;
    };
  };
}

interface TestAxiosResponse {
  headers: Record<string, unknown>;
  status: number;
}

interface TestAxiosInterceptor {
  onFulfilled: TestOnFulfilled;
  onRejected: TestOnRejected;
}

type TestOnFulfilled = (
  r: TestAxiosResponse
) => TestAxiosResponse | Promise<TestAxiosResponse>;

type TestOnRejected = (
  e: unknown
) => TestAxiosResponse | Promise<TestAxiosResponse>;

const mockCreate = jest.fn();

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  create: (): TestAxiosInstance => mockCreate(),
}));

const mockSetTimeout = jest
  .spyOn(globalThis, "setTimeout")
  .mockImplementation(((callback: () => void) => {
    callback();
  }) as typeof setTimeout);

describe("api", () => {
  it("returns immediately-successful response", async () => {
    const { addResponse, mockInstance } = createMockAxiosInstance();
    mockCreate.mockReturnValueOnce(mockInstance);
    addResponse(200);
    const res = await api("").get("");
    expect(res).toMatchObject({ status: 200 });
  });

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
});

function createMockAxiosInstance(): {
  addResponse: (status: number, headers?: Record<string, unknown>) => void;
  mockInstance: TestAxiosInstance;
} {
  const getResponseStatus = jest.fn<number, []>();
  const getResponseHeaders = jest.fn<Record<string, unknown>, []>();
  const responseInterceptors: TestAxiosInterceptor[] = [];
  const mockInstance = async (): Promise<TestAxiosResponse> => {
    const initialStatus = getResponseStatus();
    let response: TestAxiosResponse = {
      headers: getResponseHeaders(),
      status: initialStatus,
    };
    let error: unknown = { config: {}, response };
    let hasError = 500 <= response.status && response.status < 600;
    for (const interceptor of responseInterceptors) {
      await Promise.resolve(
        hasError
          ? interceptor.onRejected(error)
          : interceptor.onFulfilled(response)
      )
        .then((newResponse: TestAxiosResponse) => {
          response = newResponse;
          error = { config: {}, response };
          hasError = 500 <= response.status && response.status < 600;
        })
        .catch((newError: unknown) => {
          error = newError;
          hasError = true;
        });
    }
    if (hasError) throw error;
    return response;
  };
  mockInstance.get = mockInstance;
  mockInstance.interceptors = {
    response: {
      use(onFulfilled: TestOnFulfilled, onRejected: TestOnRejected): void {
        responseInterceptors.push({ onFulfilled, onRejected });
      },
    },
  };
  const addResponse = (
    status: number,
    headers: Record<string, unknown> = {}
  ): void => {
    getResponseStatus.mockReturnValueOnce(status);
    getResponseHeaders.mockReturnValueOnce(headers);
  };
  return { addResponse, mockInstance };
}

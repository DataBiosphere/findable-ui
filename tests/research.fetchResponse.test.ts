import { jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import { ERROR_MESSAGE } from "../src/views/ResearchView/query/constants";
import { fetchResponse } from "../src/views/ResearchView/query/fetch";

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("fetchResponse", () => {
  const mockCallbacks = (): {
    onError: jest.Mock;
    onSettled: jest.Mock;
    onSuccess: jest.Mock;
  } => ({
    onError: jest.fn(),
    onSettled: jest.fn(),
    onSuccess: jest.fn(),
  });

  it("should call onSuccess with data on successful response", async () => {
    const mockData = { results: ["study1", "study2"] };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const controller = new AbortController();
    const callbacks = mockCallbacks();

    await fetchResponse("https://api.example.com/search", "diabetes", {
      controller,
      ...callbacks,
    });

    expect(callbacks.onSuccess).toHaveBeenCalledWith(mockData);
    expect(callbacks.onError).not.toHaveBeenCalled();
    expect(callbacks.onSettled).toHaveBeenCalled();
  });

  it("should call onError on rate limit (429)", async () => {
    fetchMock.mockResponseOnce("", { status: 429 });

    const controller = new AbortController();
    const callbacks = mockCallbacks();

    await fetchResponse("https://api.example.com/search", "diabetes", {
      controller,
      ...callbacks,
    });

    expect(callbacks.onError).toHaveBeenCalledWith(
      new Error(ERROR_MESSAGE.RATE_LIMITED),
    );
    expect(callbacks.onSuccess).not.toHaveBeenCalled();
    expect(callbacks.onSettled).toHaveBeenCalled();
  });

  it("should call onError on non-ok response", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const controller = new AbortController();
    const callbacks = mockCallbacks();

    await fetchResponse("https://api.example.com/search", "diabetes", {
      controller,
      ...callbacks,
    });

    expect(callbacks.onError).toHaveBeenCalledWith(
      new Error(`${ERROR_MESSAGE.REQUEST_FAILED} (500)`),
    );
    expect(callbacks.onSuccess).not.toHaveBeenCalled();
    expect(callbacks.onSettled).toHaveBeenCalled();
  });

  it("should not call onError when request is aborted", async () => {
    const controller = new AbortController();
    controller.abort();

    fetchMock.mockRejectOnce(new DOMException("Aborted", "AbortError"));

    const callbacks = mockCallbacks();

    await fetchResponse("https://api.example.com/search", "diabetes", {
      controller,
      ...callbacks,
    });

    expect(callbacks.onError).not.toHaveBeenCalled();
    expect(callbacks.onSuccess).not.toHaveBeenCalled();
    expect(callbacks.onSettled).toHaveBeenCalled();
  });

  it("should call onSettled after success", async () => {
    const mockData = { results: [] };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const controller = new AbortController();
    const callbacks = mockCallbacks();

    await fetchResponse("https://api.example.com/search", "diabetes", {
      controller,
      ...callbacks,
    });

    expect(callbacks.onSuccess).toHaveBeenCalledTimes(1);
    expect(callbacks.onSettled).toHaveBeenCalledTimes(1);
  });

  it("should call onSettled after error", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const controller = new AbortController();
    const callbacks = mockCallbacks();

    await fetchResponse("https://api.example.com/search", "diabetes", {
      controller,
      ...callbacks,
    });

    expect(callbacks.onError).toHaveBeenCalledTimes(1);
    expect(callbacks.onSettled).toHaveBeenCalledTimes(1);
  });

  it("should send POST request with correct body and headers", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const controller = new AbortController();
    const callbacks = mockCallbacks();

    await fetchResponse("https://api.example.com/search", "cancer studies", {
      controller,
      ...callbacks,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/search",
      expect.objectContaining({
        body: JSON.stringify({ query: "cancer studies" }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }),
    );
  });

  it("should call onError with unknown error message for non-Error throws", async () => {
    fetchMock.mockRejectOnce("string error" as unknown as Error);

    const controller = new AbortController();
    const callbacks = mockCallbacks();

    await fetchResponse("https://api.example.com/search", "diabetes", {
      controller,
      ...callbacks,
    });

    expect(callbacks.onError).toHaveBeenCalledWith(
      new Error(ERROR_MESSAGE.UNKNOWN),
    );
    expect(callbacks.onSettled).toHaveBeenCalled();
  });
});

import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { FormEvent } from "react";

/**
 * Fetch callbacks passed to fetchResponse.
 */
interface FetchCallbacks {
  controller: AbortController;
  onError: (error: Error) => void;
  onSettled: () => void;
  onSuccess: (data: unknown) => void;
}

// Mock fetchResponse
const mockFetchResponse = jest.fn();

jest.unstable_mockModule("../src/views/ResearchView/query/fetch", () => ({
  fetchResponse: mockFetchResponse,
}));

const { useQuery } = await import("../src/views/ResearchView/query/useQuery");

/**
 * Creates a mock form event for testing.
 * @returns Mock FormEvent.
 */
function createMockFormEvent(): FormEvent<HTMLFormElement> {
  const mockForm = document.createElement("form");

  // Mock reset
  mockForm.reset = jest.fn();

  return {
    currentTarget: mockForm,
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLFormElement>;
}

describe("useQuery", () => {
  beforeEach(() => {
    mockFetchResponse.mockReset();
    mockFetchResponse.mockImplementation(
      async (_url: unknown, _query: unknown, callbacks: unknown) => {
        (callbacks as FetchCallbacks).onSettled();
      },
    );
  });

  describe("initial state", () => {
    it("should return onSubmit function", () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));

      expect(typeof result.current.actions.onSubmit).toBe("function");
    });
  });

  describe("submit guards", () => {
    it("should not submit if query is empty", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.actions.onSubmit(event, { query: "" });
      });

      expect(mockFetchResponse).not.toHaveBeenCalled();
    });

    it("should submit if query is provided", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.actions.onSubmit(event, { query: "valid query" });
      });

      expect(mockFetchResponse).toHaveBeenCalled();
    });
  });

  describe("submit behavior", () => {
    it("should call preventDefault on form event", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.actions.onSubmit(event, {
          query: "diabetes studies",
        });
      });

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it("should call fetchResponse with correct arguments", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.actions.onSubmit(event, {
          query: "diabetes studies",
        });
      });

      expect(mockFetchResponse).toHaveBeenCalledWith(
        "https://api.example.com",
        "diabetes studies",
        expect.objectContaining({
          controller: expect.any(AbortController),
          onError: expect.any(Function),
          onSettled: expect.any(Function),
          onSuccess: expect.any(Function),
        }),
      );
    });

    it("should pass url to fetchResponse", async () => {
      const testUrl = "https://custom-api.example.com/search";
      const { result } = renderHook(() => useQuery(testUrl));
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.actions.onSubmit(event, {
          query: "cancer studies",
        });
      });

      expect(mockFetchResponse).toHaveBeenCalledWith(
        testUrl,
        expect.any(String),
        expect.any(Object),
      );
    });
  });

  describe("abort handling", () => {
    it("should create new AbortController for each submit", async () => {
      const controllers: AbortController[] = [];
      mockFetchResponse.mockImplementation(
        async (_url: unknown, _query: unknown, callbacks: unknown) => {
          controllers.push((callbacks as FetchCallbacks).controller);
          (callbacks as FetchCallbacks).onSettled();
        },
      );

      const { result } = renderHook(() => useQuery("https://api.example.com"));

      await act(async () => {
        await result.current.actions.onSubmit(createMockFormEvent(), {
          query: "query 1",
        });
      });

      await act(async () => {
        await result.current.actions.onSubmit(createMockFormEvent(), {
          query: "query 2",
        });
      });

      expect(controllers).toHaveLength(2);
      expect(controllers[0]).not.toBe(controllers[1]);
    });
  });
});

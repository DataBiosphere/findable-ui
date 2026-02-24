import { jest } from "@jest/globals";
import { act, renderHook, waitFor } from "@testing-library/react";
import { FormEvent } from "react";
import { FIELD_NAME } from "../src/views/ExploreView/research/query/constants";

// Mock fetchResponse
const mockFetchResponse = jest.fn();

jest.unstable_mockModule(
  "../src/views/ExploreView/research/query/fetch",
  () => ({
    fetchResponse: mockFetchResponse,
  }),
);

const { useQuery } =
  await import("../src/views/ExploreView/research/query/useQuery");

/**
 * Creates a mock form event for testing.
 * @param query - The query value for the AI prompt field.
 * @returns Mock FormEvent.
 */
function createMockFormEvent(query: string): FormEvent<HTMLFormElement> {
  const mockInput = document.createElement("input");
  mockInput.name = FIELD_NAME.AI_PROMPT;
  mockInput.value = query;

  const mockForm = document.createElement("form");
  mockForm.appendChild(mockInput);

  // Mock reset
  mockForm.reset = jest.fn(() => {
    mockInput.value = "";
  });

  return {
    currentTarget: mockForm,
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLFormElement>;
}

describe("useQuery", () => {
  beforeEach(() => {
    mockFetchResponse.mockReset();
    mockFetchResponse.mockImplementation(async (_url, _query, callbacks) => {
      callbacks.onSettled();
    });
  });

  describe("initial state", () => {
    it("should return loading as false initially", () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));

      expect(result.current.status.loading).toBe(false);
    });

    it("should return onSubmit function", () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));

      expect(typeof result.current.actions.onSubmit).toBe("function");
    });
  });

  describe("submit guards", () => {
    it("should not submit if query is empty", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent("");

      await act(async () => {
        await result.current.actions.onSubmit(event);
      });

      expect(mockFetchResponse).not.toHaveBeenCalled();
    });

    it("should not submit if query is only whitespace", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent("   ");

      await act(async () => {
        await result.current.actions.onSubmit(event);
      });

      expect(mockFetchResponse).not.toHaveBeenCalled();
    });
  });

  describe("submit behavior", () => {
    it("should call preventDefault on form event", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent("diabetes studies");

      await act(async () => {
        await result.current.actions.onSubmit(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it("should set loading to true during submit", async () => {
      let resolveCallback: (() => void) | undefined;
      mockFetchResponse.mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            resolveCallback = resolve;
          }),
      );

      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent("diabetes studies");

      // Start submit but don't await
      act(() => {
        result.current.actions.onSubmit(event);
      });

      // Check loading is true while request is in flight
      await waitFor(() => {
        expect(result.current.status.loading).toBe(true);
      });

      // Resolve the request
      await act(async () => {
        resolveCallback?.();
      });
    });

    it("should call fetchResponse with correct arguments", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent("diabetes studies");

      await act(async () => {
        await result.current.actions.onSubmit(event);
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

    it("should reset form after submit", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent("diabetes studies");

      await act(async () => {
        await result.current.actions.onSubmit(event);
      });

      expect(event.currentTarget.reset).toHaveBeenCalled();
    });

    it("should pass url to fetchResponse", async () => {
      const testUrl = "https://custom-api.example.com/search";
      const { result } = renderHook(() => useQuery(testUrl));
      const event = createMockFormEvent("cancer studies");

      await act(async () => {
        await result.current.actions.onSubmit(event);
      });

      expect(mockFetchResponse).toHaveBeenCalledWith(
        testUrl,
        expect.any(String),
        expect.any(Object),
      );
    });
  });

  describe("after fetch completes", () => {
    it("should set loading to false after fetch settles", async () => {
      mockFetchResponse.mockImplementation(async (_url, _query, callbacks) => {
        callbacks.onSettled();
      });

      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent("diabetes studies");

      await act(async () => {
        await result.current.actions.onSubmit(event);
      });

      expect(result.current.status.loading).toBe(false);
    });

    it("should refocus input after fetch settles", async () => {
      const { result } = renderHook(() => useQuery("https://api.example.com"));
      const event = createMockFormEvent("diabetes studies");

      const mockInput = event.currentTarget.elements.namedItem(
        FIELD_NAME.AI_PROMPT,
      ) as HTMLInputElement;
      mockInput.focus = jest.fn();

      await act(async () => {
        await result.current.actions.onSubmit(event);
      });

      expect(mockInput.focus).toHaveBeenCalled();
    });
  });

  describe("abort handling", () => {
    it("should create new AbortController for each submit", async () => {
      const controllers: AbortController[] = [];
      mockFetchResponse.mockImplementation(async (_url, _query, callbacks) => {
        controllers.push(callbacks.controller);
        callbacks.onSettled();
      });

      const { result } = renderHook(() => useQuery("https://api.example.com"));

      await act(async () => {
        await result.current.actions.onSubmit(createMockFormEvent("query 1"));
      });

      await act(async () => {
        await result.current.actions.onSubmit(createMockFormEvent("query 2"));
      });

      expect(controllers).toHaveLength(2);
      expect(controllers[0]).not.toBe(controllers[1]);
    });
  });

  describe("undefined url", () => {
    it("should pass undefined url to fetchResponse when not provided", async () => {
      const { result } = renderHook(() => useQuery());
      const event = createMockFormEvent("diabetes studies");

      await act(async () => {
        await result.current.actions.onSubmit(event);
      });

      expect(mockFetchResponse).toHaveBeenCalledWith(
        undefined,
        "diabetes studies",
        expect.any(Object),
      );
    });
  });
});

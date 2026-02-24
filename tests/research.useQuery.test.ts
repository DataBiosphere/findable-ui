import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { FormEvent } from "react";
import { FIELD_NAME } from "../src/views/ExploreView/research/query/constants";

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
      mockFetchResponse.mockImplementation(
        async (_url: unknown, _query: unknown, callbacks: unknown) => {
          controllers.push((callbacks as FetchCallbacks).controller);
          (callbacks as FetchCallbacks).onSettled();
        },
      );

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

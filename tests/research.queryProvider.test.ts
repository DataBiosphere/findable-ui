import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { FormEvent, ReactNode } from "react";
import React from "react";

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

const { useQuery } =
  await import("../src/views/ResearchView/state/query/hooks/UseQuery/hook");
const { ChatProvider } =
  await import("../src/views/ResearchView/state/provider");
const { ConfigContext } = await import("../src/providers/config");

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

/**
 * Creates a wrapper component that provides ConfigContext and ChatProvider.
 * @param url - The AI URL to provide via config.
 * @returns A wrapper component for renderHook.
 */
function createWrapper(
  url = "https://api.example.com",
): ({ children }: { children: ReactNode }) => ReactNode {
  return function Wrapper({ children }: { children: ReactNode }): ReactNode {
    return React.createElement(
      ConfigContext.Provider,
      {
        value: {
          config: {
            ai: {
              enabled: true,
              routes: { research: "/research", search: "/search" },
              url,
            },
          } as never,
          defaultEntityListType: "",
          entityConfig: {} as never,
          entityListType: "",
        },
      },
      React.createElement(ChatProvider, {}, children),
    );
  };
}

describe("QueryProvider", () => {
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
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });

      expect(typeof result.current.onSubmit).toBe("function");
    });
  });

  describe("submit guards", () => {
    it("should not submit if status is loading", async () => {
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "valid query" },
          { status: { loading: true } },
        );
      });

      expect(mockFetchResponse).not.toHaveBeenCalled();
    });

    it("should not submit if query is empty", async () => {
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "" },
          { status: { loading: false } },
        );
      });

      expect(mockFetchResponse).not.toHaveBeenCalled();
    });

    it("should submit if query is provided", async () => {
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "valid query" },
          { status: { loading: false } },
        );
      });

      expect(mockFetchResponse).toHaveBeenCalled();
    });
  });

  describe("submit behavior", () => {
    it("should call preventDefault on form event", async () => {
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "diabetes studies" },
          { status: { loading: false } },
        );
      });

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it("should call fetchResponse with correct arguments", async () => {
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "diabetes studies" },
          { status: { loading: false } },
        );
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
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(testUrl),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "cancer studies" },
          { status: { loading: false } },
        );
      });

      expect(mockFetchResponse).toHaveBeenCalledWith(
        testUrl,
        expect.any(String),
        expect.any(Object),
      );
    });
  });

  describe("option callbacks", () => {
    it("should call onMutate after dispatching query", async () => {
      const onMutate = jest.fn();
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "test query" },
          { onMutate, status: { loading: false } },
        );
      });

      expect(onMutate).toHaveBeenCalledWith(event.currentTarget, "test query");
    });

    it("should call onSettled after fetch completes", async () => {
      const onSettled = jest.fn();
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "test query" },
          { onSettled, status: { loading: false } },
        );
      });

      expect(onSettled).toHaveBeenCalledWith(event.currentTarget);
    });

    it("should call onSuccess after successful fetch", async () => {
      const mockData = { message: "success" };
      mockFetchResponse.mockImplementation(
        async (_url: unknown, _query: unknown, callbacks: unknown) => {
          (callbacks as FetchCallbacks).onSuccess(mockData);
          (callbacks as FetchCallbacks).onSettled();
        },
      );

      const onSuccess = jest.fn();
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "test query" },
          { onSuccess, status: { loading: false } },
        );
      });

      expect(onSuccess).toHaveBeenCalledWith(mockData);
    });

    it("should call onError after failed fetch", async () => {
      const mockError = new Error("Network error");
      mockFetchResponse.mockImplementation(
        async (_url: unknown, _query: unknown, callbacks: unknown) => {
          (callbacks as FetchCallbacks).onError(mockError);
          (callbacks as FetchCallbacks).onSettled();
        },
      );

      const onError = jest.fn();
      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });
      const event = createMockFormEvent();

      await act(async () => {
        await result.current.onSubmit(
          event,
          { query: "test query" },
          { onError, status: { loading: false } },
        );
      });

      expect(onError).toHaveBeenCalledWith(mockError);
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

      const { result } = renderHook(() => useQuery(), {
        wrapper: createWrapper(),
      });

      await act(async () => {
        await result.current.onSubmit(
          createMockFormEvent(),
          { query: "query 1" },
          { status: { loading: false } },
        );
      });

      await act(async () => {
        await result.current.onSubmit(
          createMockFormEvent(),
          { query: "query 2" },
          { status: { loading: false } },
        );
      });

      expect(controllers).toHaveLength(2);
      expect(controllers[0]).not.toBe(controllers[1]);
    });
  });
});

import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

const { useWindowResize } = await import("../src/hooks/useWindowResize");

describe("useWindowResize", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("returns current window dimensions", () => {
    // Set window dimensions
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 768,
      writable: true,
    });

    const { result } = renderHook(() => useWindowResize());

    expect(result.current).toEqual({ height: 768, width: 1024 });
  });

  test("updates dimensions on window resize", () => {
    // Set initial dimensions
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 768,
      writable: true,
    });

    const { result } = renderHook(() => useWindowResize(100));

    expect(result.current).toEqual({ height: 768, width: 1024 });

    // Simulate window resize
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: 1920,
        writable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        configurable: true,
        value: 1080,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));

      // Fast-forward timeout
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toEqual({ height: 1080, width: 1920 });
  });

  test("debounces resize events with the specified timeout", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 768,
      writable: true,
    });

    const { result } = renderHook(() => useWindowResize(200));

    // Simulate multiple rapid resize events
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: 1920,
        writable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        configurable: true,
        value: 1080,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));

      // Fast-forward only 100ms - should not update yet
      jest.advanceTimersByTime(100);
    });

    // Should still have initial dimensions
    expect(result.current).toEqual({ height: 768, width: 1024 });

    act(() => {
      // Fast-forward remaining 100ms
      jest.advanceTimersByTime(100);
    });

    // Now should have updated dimensions
    expect(result.current).toEqual({ height: 1080, width: 1920 });
  });

  test("cleans up event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useWindowResize());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});

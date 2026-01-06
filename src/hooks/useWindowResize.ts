import { useEffect, useRef, useState } from "react";

export interface WindowSize {
  height: number;
  width: number;
}

/**
 * Listens to window resize event and returns window height and width values.
 * @param timeout - Timeout in milliseconds to wait before recalculating window size.
 * @returns window height and width values.
 */
export const useWindowResize = (timeout = 200): WindowSize => {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize());

  useEffect(() => {
    // Skip event listener setup during static build when window is not available.
    if (typeof window === "undefined") return;
    /**
     * Resize event fired; window size recalculated.
     */
    const onResize = (): void => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setWindowSize(getWindowSize());
      }, timeout);
    };
    // Add resize event listener.
    window.addEventListener("resize", onResize);
    return (): void => {
      // Remove resize event listener.
      window.removeEventListener("resize", onResize);
      // Clear timeout.
      clearTimeout(timeoutRef.current);
    };
  }, [timeout]);

  return windowSize;
};

/**
 * Returns window height and width.
 * @returns window height and width.
 */
function getWindowSize(): WindowSize {
  if (typeof window === "undefined") {
    return { height: 0, width: 0 };
  }
  const { innerHeight = 0, innerWidth = 0 } = window;
  return { height: innerHeight, width: innerWidth };
}

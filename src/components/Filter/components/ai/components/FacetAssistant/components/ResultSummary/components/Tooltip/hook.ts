import { useCallback, useState } from "react";

/**
 * Hook to measure the width of an element and provide a ref to attach to it.
 * Returns the measured width and a ref function to attach to the element.
 * @returns A tuple containing the measured width and a ref function to attach to the element.
 */
export function useMeasuredWidth<T extends HTMLElement>(): [
  number | undefined,
  (node: T | null) => void
] {
  const [width, setWidth] = useState<number>();

  const ref = useCallback((node: T | null) => {
    if (!node) return;

    const { width: measuredWidth } = node.getBoundingClientRect();

    setWidth(measuredWidth);
  }, []);

  return [width, ref];
}

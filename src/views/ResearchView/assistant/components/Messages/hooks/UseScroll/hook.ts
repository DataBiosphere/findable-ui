import { DependencyList, RefObject, useEffect, useRef } from "react";

/**
 * Provides a ref that auto-scrolls to the bottom when dependencies change.
 * @param deps - Dependency list that triggers scroll on change.
 * @returns A ref to attach to the scrollable container.
 */
export function useScroll(
  deps: DependencyList,
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({
      behavior: "smooth",
      top: ref.current.scrollHeight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps are passed in as an argument
  }, deps);

  return ref;
}

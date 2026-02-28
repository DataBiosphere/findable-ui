import { DependencyList, RefObject, useEffect, useRef } from "react";

/**
 * Provides a ref that scrolls to the bottom when dependencies change.
 * Uses instant scroll on mount and smooth scroll on subsequent updates.
 * @param deps - Dependency list that triggers scroll on change.
 * @returns A ref to attach to the scrollable container.
 */
export function useScroll(
  deps: DependencyList,
): RefObject<HTMLDivElement | null> {
  const behaviorRef = useRef<ScrollBehavior>("instant");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({
      behavior: behaviorRef.current,
      top: ref.current.scrollHeight,
    });
    behaviorRef.current = "smooth";
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps are passed in as an argument
  }, deps);

  return ref;
}

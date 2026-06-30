import { DependencyList, RefObject, useEffect, useRef } from "react";
import { scrollToBottom } from "./utils";

/**
 * Provides a ref that scrolls to the bottom when dependencies change, and keeps
 * the view pinned to the bottom while content grows asynchronously (e.g. an
 * assistant reply whose markdown renders a tick after the message mounts).
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
    if (ref.current) scrollToBottom(ref.current, behaviorRef.current);
    behaviorRef.current = "smooth";
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps are passed in as an argument
  }, deps);

  // Content can grow after the scroll above has run — most notably an assistant
  // reply rendered as markdown, which paints empty on first commit and fills in
  // a tick later via an async pipeline. Only the newest message can grow late
  // (older ones are already rendered), so observe just the last child and re-pin
  // to the bottom as it grows. (No "did the user scroll up?" guard: the observer
  // only fires while a freshly submitted reply is settling, when the user is
  // already at the bottom; once settled it stops firing, so scrolling up is
  // unaffected.)
  useEffect(() => {
    const container = ref.current;
    const target = container?.lastElementChild;
    if (!container || !target || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() =>
      scrollToBottom(container, behaviorRef.current),
    );
    observer.observe(target);
    return (): void => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-target the last child when deps change
  }, deps);

  return ref;
}

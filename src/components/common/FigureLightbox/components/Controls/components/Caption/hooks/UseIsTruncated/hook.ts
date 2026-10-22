import { ReactNode, RefObject, useEffect, useState } from "react";
import { isTruncated } from "./utils";

/**
 * Returns whether an element's content is cut off, e.g. by a line clamp. Rechecked when the content changes, when the element resizes (a narrower element wraps onto more lines), and once web fonts have loaded.
 * @param ref - Element to check.
 * @param content - Element content; a change triggers a recheck.
 * @returns True if the content is cut off.
 */
export function useIsTruncated(
  ref: RefObject<HTMLElement | null>,
  content: ReactNode,
): boolean {
  const [truncated, setTruncated] = useState<boolean>(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let active = true;
    const check = (): void => {
      if (active) setTruncated(isTruncated(element));
    };
    check();
    // A web font that loads later can wrap the caption onto more lines without
    // resizing the clamped box, so the check runs again once fonts have loaded.
    document.fonts?.ready.then(check);
    const observer = new ResizeObserver(check);
    observer.observe(element);
    return (): void => {
      active = false;
      observer.disconnect();
    };
  }, [content, ref]);
  return truncated;
}

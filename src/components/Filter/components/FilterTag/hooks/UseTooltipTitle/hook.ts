import { useEffect, useRef, useState } from "react";
import { UseTooltipTitle } from "./types";

/**
 * Tracks whether the chip's `.MuiChip-label` is truncated by ellipsis,
 * returning the label string as a tooltip title only when it is. Uses
 * `ResizeObserver` on the label element so the title stays accurate
 * across container resizes, font loads, and label changes.
 * @param label - Filter tag label.
 * @returns The ref to attach to the chip element and the tooltip title
 *   (the label when truncated, otherwise null).
 */
export function useTooltipTitle(label: string): UseTooltipTitle {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>(".MuiChip-label");
    if (!el) return;
    const update = (): void => setIsOverflowed(el.offsetWidth < el.scrollWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return (): void => observer.disconnect();
  }, [label]);

  return { ref, title: isOverflowed ? label : null };
}

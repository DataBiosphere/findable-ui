import {
  RefObject,
  UIEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseStickyHead } from "./types";

/**
 * Sticky head and scroll bar for a table that scrolls sideways in its own container.
 * @param scrollElementRef - Ref for the table's scroll container.
 * @param enabled - Whether the sticky head is used and the table is rendered.
 * @returns Refs, scroll handler and state for the sticky head and scroll bar.
 */
export const useStickyHead = (
  scrollElementRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
): UseStickyHead => {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const stickyHeadRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [widths, setWidths] = useState({ clientWidth: 0, tableWidth: 0 });

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = (): void => {
      frame = 0;
      const container = scrollElementRef.current;
      const head = stickyHeadRef.current;
      if (!container || !head) return;
      setStuck(
        container.getBoundingClientRect().top <
          head.getBoundingClientRect().top,
      );
    };
    const onWindowChange = (): void => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onWindowChange, { passive: true });
    window.addEventListener("resize", onWindowChange);
    return (): void => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onWindowChange);
      window.removeEventListener("resize", onWindowChange);
    };
  }, [enabled, scrollElementRef]);

  useEffect(() => {
    if (!enabled) return;
    const container = scrollElementRef.current;
    const tableHead = container?.querySelector("thead"); // spans every column track, unlike the table box
    if (!container || !tableHead) return;
    const observer = new ResizeObserver(() => {
      const { clientWidth, scrollWidth: tableWidth } = container;
      setWidths((prev) =>
        prev.clientWidth === clientWidth && prev.tableWidth === tableWidth
          ? prev
          : { clientWidth, tableWidth },
      );
    });
    observer.observe(container);
    observer.observe(tableHead);
    return (): void => observer.disconnect();
  }, [enabled, scrollElementRef]);

  const onScroll = useCallback(
    ({ currentTarget }: UIEvent<HTMLDivElement>): void => {
      for (const element of [
        scrollElementRef.current,
        scrollbarRef.current,
        stickyHeadRef.current,
      ]) {
        if (element && element.scrollLeft !== currentTarget.scrollLeft) {
          element.scrollLeft = currentTarget.scrollLeft;
        }
      }
    },
    [scrollElementRef],
  );

  return {
    onScroll,
    overflowing: widths.tableWidth > widths.clientWidth,
    scrollbarRef,
    stickyHeadRef,
    stuck,
    tableWidth: widths.tableWidth,
  };
};

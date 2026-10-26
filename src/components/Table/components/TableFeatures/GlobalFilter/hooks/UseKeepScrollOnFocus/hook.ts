import type { FocusEventHandler } from "react";
import { useCallback, useEffect, useRef } from "react";
import type { UseKeepScrollOnFocusProps } from "./types";
import { onFocusKeepScroll, trackScrollY } from "./utils";

/**
 * Keeps the page still when a pinned input gains focus. Browsers scroll a
 * focused text input to clear the page's scroll-padding-top, so one pinned
 * inside that padding (e.g. the data dictionary's search box, in the sticky
 * filters) makes the page jump: Chrome scrolls before the focus event, even with
 * a negative scroll-margin, and Safari just after it. Scroll events lag the
 * scroll by a frame, so the last position they saw is where the page was before
 * the focus scroll.
 * @param props - Hook props.
 * @param props.onFocus - The input's own focus handler, called after.
 * @returns Focus handler for the input.
 */
export const useKeepScrollOnFocus = ({
  onFocus,
}: UseKeepScrollOnFocusProps): FocusEventHandler<HTMLElement> => {
  const scrollYRef = useRef(0);

  useEffect(() => trackScrollY(scrollYRef), []);

  return useCallback<FocusEventHandler<HTMLElement>>(
    (event) => onFocusKeepScroll(event, scrollYRef.current, onFocus),
    [onFocus],
  );
};

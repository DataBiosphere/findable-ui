import type { RefObject } from "react";

/**
 * Return value of the useLayoutHeight hook.
 */
export interface UseLayoutHeight<T extends HTMLElement = HTMLElement> {
  isMeasured: boolean;
  ref: RefObject<T | null>;
}

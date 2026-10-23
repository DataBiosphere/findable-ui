import { RefObject, UIEvent } from "react";

/**
 * Return type for the useStickyHead hook.
 */
export interface UseStickyHead {
  onScroll: (event: UIEvent<HTMLDivElement>) => void;
  overflowing: boolean;
  scrollbarRef: RefObject<HTMLDivElement | null>;
  stickyHeadRef: RefObject<HTMLDivElement | null>;
  stuck: boolean;
  tableWidth: number;
}

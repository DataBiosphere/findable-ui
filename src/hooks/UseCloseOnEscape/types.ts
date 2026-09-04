import type { RefObject } from "react";

export interface UseCloseOnEscapeProps {
  /**
   * When given, Escape only closes while focus is inside this element, and
   * propagation is left intact otherwise. Surfaces that trap focus can omit it.
   */
  containerRef?: RefObject<HTMLElement | null>;
  onClose: () => void;
  open: boolean;
}

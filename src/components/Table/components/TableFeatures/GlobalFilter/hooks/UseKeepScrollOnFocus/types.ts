import type { FocusEventHandler } from "react";

/**
 * Props for the useKeepScrollOnFocus hook.
 */
export interface UseKeepScrollOnFocusProps {
  onFocus?: FocusEventHandler<HTMLElement>;
}

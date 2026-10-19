import type { LightboxFigureItem } from "../../types";

/**
 * Return value of the useShowInContext hook.
 */
export interface UseShowInContext {
  /** Shows the pending figure on the page; call once the lightbox has closed. */
  onExited: () => void;
  /** Records the figure to show on the page once the lightbox has closed. */
  onShowInContext: (figure: LightboxFigureItem) => void;
}

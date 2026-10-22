import type { ReactNode } from "react";

/**
 * Props for the lightbox Caption component.
 */
export interface CaptionProps {
  /** Caption content. */
  caption?: ReactNode;
  /** Closes the lightbox and shows the figure on the page. */
  onShowInContext: () => void;
}

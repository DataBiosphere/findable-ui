import type { ReactNode, RefObject } from "react";

/**
 * Props for the FigureLightbox component.
 */
export interface FigureLightboxProps {
  /** Figures to show, in display order. */
  figures: LightboxFigureItem[];
  /** Index of the figure to show. */
  index: number;
  /** Called when the lightbox closes. */
  onClose: () => void;
  /** Called when the shown figure changes. */
  onIndexChange: (index: number) => void;
  /** Whether the lightbox is open. */
  open: boolean;
}

/**
 * Natural size of an image, in pixels.
 */
export interface ImageSize {
  height: number;
  width: number;
}

/**
 * A figure the lightbox can show.
 */
export interface LightboxFigureItem {
  /** Image alt text; also names the lightbox dialog. */
  alt: string;
  /** Caption content, shown below the figure in the lightbox. */
  caption?: ReactNode;
  /** Inline figure element, used to order figures by document position and to show a figure in context. */
  figureRef: RefObject<HTMLElement | null>;
  /** Unique figure id. */
  id: string;
  /** URL of the original file, for "View original" and "Download". */
  originalSrc: string;
  /** Image URL. */
  src: string;
}

import type { ReactNode, RefObject } from "react";

/**
 * Props for the useRegisterFigure hook.
 */
export interface UseRegisterFigureProps {
  /** Image alt text. */
  alt: string;
  /** Caption content. */
  caption?: ReactNode;
  /** Root-relative path to the original file; defaults to src. */
  originalSrc?: string;
  /** Root-relative path to the image, or an image data URL. */
  src: string | undefined;
}

/**
 * Return value of the useRegisterFigure hook.
 */
export interface UseRegisterFigure {
  /** Ref for the inline figure element. */
  figureRef: RefObject<HTMLElement | null>;
  /** Opens the lightbox at this figure. */
  onOpen: () => void;
}

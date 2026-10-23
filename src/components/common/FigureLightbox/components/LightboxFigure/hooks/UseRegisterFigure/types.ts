import type { ReactNode, RefObject } from "react";

/**
 * Return value of the useRegisterFigure hook.
 */
export interface UseRegisterFigure {
  actions: UseRegisterFigureActions;
  /** Ref for the inline figure element. */
  figureRef: RefObject<HTMLElement | null>;
}

/**
 * Actions returned by the useRegisterFigure hook.
 */
export interface UseRegisterFigureActions {
  /** Opens the lightbox at this figure. */
  onOpen: () => void;
  /** Starts loading the lightbox, so it is ready to open; undefined outside a provider. */
  onPreload?: () => void;
}

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

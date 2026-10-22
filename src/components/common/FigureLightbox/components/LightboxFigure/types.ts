import type { ReactNode } from "react";
import type { StaticImageProps } from "../../../StaticImage/staticImage";

/**
 * Props for the LightboxFigure component.
 */
export interface LightboxFigureProps extends StaticImageProps {
  /** Caption content, rendered in the figure's figcaption and in the lightbox. */
  caption?: ReactNode;
  /** Class name applied to the figure. */
  className?: string;
  /** Root-relative path to the original file, for "View original" and "Download"; defaults to src. */
  originalSrc?: string;
}

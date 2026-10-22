import { JSX } from "react";
import { useFigureLightbox } from "../../provider/hook";
import { FigureLightboxProvider } from "../../provider/provider";
import { Figure } from "./components/Figure/figure";
import type { LightboxFigureProps } from "./types";

/**
 * Figure that opens in a lightbox, with zoom and pan, when clicked.
 * Inside a FigureLightboxProvider, the lightbox steps between all the provider's figures; on its own, the figure gets a lightbox of its own.
 * @param props - Component props.
 * @param props.alt - Image alt text.
 * @param props.caption - Caption content, rendered in the figure's figcaption and in the lightbox.
 * @param props.className - Class name applied to the figure.
 * @param props.height - Image height.
 * @param props.originalSrc - Root-relative path to the original file, for "View original" and "Download"; defaults to src.
 * @param props.src - Root-relative path to a file in the app's public folder, without the base path, or an image data URL.
 * @param props.width - Image width.
 * @returns The figure.
 */
export const LightboxFigure = (props: LightboxFigureProps): JSX.Element => {
  const context = useFigureLightbox();
  if (context) return <Figure {...props} />;
  return (
    <FigureLightboxProvider>
      <Figure {...props} />
    </FigureLightboxProvider>
  );
};

import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import { JSX } from "react";
import { SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";
import { StaticImage } from "../../../../../StaticImage/staticImage";
import { LABEL } from "../../../../constants";
import { useRegisterFigure } from "../../hooks/UseRegisterFigure/hook";
import type { LightboxFigureProps } from "../../types";
import { StyledButton, StyledFigure, StyledHint } from "./figure.styles";

/**
 * Inline figure: the image, as a button that opens the lightbox, with an expand hint on hover and focus, and the caption.
 * Registers itself with the nearest FigureLightboxProvider.
 * @param props - Component props.
 * @param props.alt - Image alt text.
 * @param props.caption - Caption content.
 * @param props.className - Class name applied to the figure.
 * @param props.height - Image height.
 * @param props.originalSrc - Root-relative path to the original file; defaults to src.
 * @param props.src - Root-relative path to the image, or an image data URL.
 * @param props.width - Image width.
 * @returns The figure.
 */
export const Figure = ({
  alt,
  caption,
  className,
  height,
  originalSrc,
  src,
  width,
}: LightboxFigureProps): JSX.Element => {
  const { figureRef, onOpen } = useRegisterFigure({
    alt,
    caption,
    originalSrc,
    src,
  });
  return (
    <StyledFigure className={className} ref={figureRef}>
      <StyledButton
        aria-haspopup="dialog"
        aria-label={`${LABEL.EXPAND}: ${alt}`}
        onClick={onOpen}
      >
        <StaticImage alt={alt} height={height} src={src} width={width} />
        <StyledHint aria-hidden className="figure-hint">
          <OpenInFullRoundedIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
        </StyledHint>
      </StyledButton>
      {caption && <figcaption>{caption}</figcaption>}
    </StyledFigure>
  );
};

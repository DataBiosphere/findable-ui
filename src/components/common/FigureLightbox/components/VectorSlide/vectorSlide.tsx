import { JSX } from "react";
import { getFitSize } from "../../utils";
import { VectorSlideProps } from "./types";
import { getUnsizedStyle } from "./utils";
import { StyledImage } from "./vectorSlide.styles";

/**
 * Lightbox slide for a vector image (SVG), sized to fit the slide area.
 * The library's default slide never renders an image larger than its natural size, which suits photos but leaves an SVG small; an SVG scales without losing detail, so it fills the viewport instead.
 * The image is sized exactly, rather than stretched with object-fit, so clicks beside it still reach the backdrop.
 * Until the slide has a size, the image shows at its natural size, capped to the slide area, and reports that size once it loads so the slide can be rebuilt. The library's default slide isn't used as a fallback: the zoom plugin keeps the size it measures there, which would cap the zoom once the slide has a size.
 * @param props - Component props.
 * @param props.onMeasure - Called with the image's natural size when it loads, if the slide has no size yet.
 * @param props.rect - Size of the area the slide fits into.
 * @param props.slide - Slide.
 * @returns The slide image.
 */
export const VectorSlide = ({
  onMeasure,
  rect,
  slide,
}: VectorSlideProps): JSX.Element => {
  const isSized = Boolean(slide.width && slide.height);
  return (
    <StyledImage
      alt={slide.alt ?? ""}
      draggable={false}
      onLoad={({ currentTarget: { naturalHeight, naturalWidth } }): void => {
        if (isSized || !naturalWidth || !naturalHeight) return;
        onMeasure(slide.src, { height: naturalHeight, width: naturalWidth });
      }}
      src={slide.src}
      style={isSized ? getFitSize(slide, rect) : getUnsizedStyle()}
    />
  );
};

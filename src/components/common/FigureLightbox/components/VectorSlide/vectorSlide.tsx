import { JSX } from "react";
import { getFitSize } from "../../utils";
import { VectorSlideProps } from "./types";
import { StyledImage } from "./vectorSlide.styles";

/**
 * Lightbox slide for a vector image (SVG), sized to fit the slide area.
 * The library's default slide never renders an image larger than its natural size, which suits photos but leaves an SVG small; an SVG scales without losing detail, so it fills the viewport instead.
 * The image is sized exactly, rather than stretched with object-fit, so clicks beside it still reach the backdrop.
 * @param props - Component props.
 * @param props.rect - Size of the area the slide fits into.
 * @param props.slide - Slide, with its width and height set.
 * @returns The slide image.
 */
export const VectorSlide = ({ rect, slide }: VectorSlideProps): JSX.Element => {
  const { height, width } = getFitSize(slide, rect);
  return (
    <StyledImage
      alt={slide.alt ?? ""}
      draggable={false}
      src={slide.src}
      style={{ height, width }}
    />
  );
};

import type { ContainerRect, SlideImage } from "yet-another-react-lightbox";

/**
 * Props for the lightbox VectorSlide component.
 */
export interface VectorSlideProps {
  /** Size of the area the slide fits into. */
  rect: ContainerRect;
  /** Slide, with its width and height set. */
  slide: SlideImage;
}

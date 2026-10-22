import type { ContainerRect, SlideImage } from "yet-another-react-lightbox";
import type { ImageSize } from "../../types";

/**
 * Props for the lightbox VectorSlide component.
 */
export interface VectorSlideProps {
  /** Called with the image's natural size when it loads, if the slide has no size yet. */
  onMeasure: (src: string, size: ImageSize) => void;
  /** Size of the area the slide fits into. */
  rect: ContainerRect;
  /** Slide; its width and height are set once the inline image has loaded. */
  slide: SlideImage;
}

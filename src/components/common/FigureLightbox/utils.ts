import type { ContainerRect, SlideImage } from "yet-another-react-lightbox";
import { getStaticImageSrc } from "../StaticImage/utils";
import { LABEL, VECTOR_SCALE } from "./constants";
import type { LightboxFigureItem } from "./types";

/**
 * Builds the lightbox slide for a figure. The slide size comes from the inline image's natural size, scaled up for vector images so they fit the viewport and zoom past their natural size.
 * Without a loaded inline image, the slide has no size and the lightbox measures the image itself.
 * @param figure - Figure.
 * @returns The lightbox slide.
 */
export function buildSlide(figure: LightboxFigureItem): SlideImage {
  const { alt, figureRef, src } = figure;
  const image = figureRef.current?.querySelector("img");
  const slide: SlideImage = { alt, src };
  if (!image?.naturalWidth || !image.naturalHeight) return slide;
  const scale = isVectorImage(src) ? VECTOR_SCALE : 1;
  return {
    ...slide,
    height: image.naturalHeight * scale,
    width: image.naturalWidth * scale,
  };
}

/**
 * Compares two figures by their inline figure's position in the document. A figure that isn't in the document (no element) sorts last.
 * @param a - First figure.
 * @param b - Second figure.
 * @returns A negative number if a comes first, a positive number if b comes first, otherwise 0.
 */
export function compareDocumentOrder(
  a: LightboxFigureItem,
  b: LightboxFigureItem,
): number {
  const aEl = a.figureRef.current;
  const bEl = b.figureRef.current;
  if (aEl === bEl) return 0;
  if (!aEl) return 1;
  if (!bEl) return -1;
  return aEl.compareDocumentPosition(bEl) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}

/**
 * Formats a zoom level as a percentage, where 1 (fit to screen) is 100%.
 * @param zoom - Zoom level.
 * @returns The zoom percentage, e.g. "150%".
 */
export function formatZoom(zoom: number): string {
  return `${Math.round(zoom * 100)}%`;
}

/**
 * Returns the counter label for a figure, e.g. "Figure 2 of 11".
 * @param index - Zero-based figure index.
 * @param total - Number of figures.
 * @returns The counter label.
 */
export function getCounterLabel(index: number, total: number): string {
  return LABEL.COUNTER.replace("{index}", String(index + 1)).replace(
    "{total}",
    String(total),
  );
}

/**
 * Returns the size at which a slide fits inside an area, keeping its aspect ratio.
 * @param slide - Slide, with its width and height set.
 * @param rect - Size of the area.
 * @returns The fitted width and height, in pixels.
 */
export function getFitSize(
  slide: SlideImage,
  rect: ContainerRect,
): ContainerRect {
  const { height = 0, width = 0 } = slide;
  if (!width || !height) return rect;
  const scale = Math.min(rect.width / width, rect.height / height);
  return { height: height * scale, width: width * scale };
}

/**
 * Returns whether an image URL is a vector image (SVG), by file extension or data URL type.
 * @param src - Image URL.
 * @returns True if the image is an SVG.
 */
export function isVectorImage(src: string): boolean {
  return src.startsWith("data:image/svg+xml") || /\.svg(?:[?#]|$)/i.test(src);
}

/**
 * Returns whether a slide is a vector image with a known size, which the lightbox renders with VectorSlide.
 * @param slide - Slide.
 * @returns True if the slide is an SVG with its width and height set.
 */
export function isVectorSlide(slide: SlideImage): boolean {
  return Boolean(slide.width && slide.height && isVectorImage(slide.src));
}

/**
 * Resolves a figure URL: a root-relative path is prefixed with the app's base path, as StaticImage does; an absolute or data URL (e.g. "https://…", "//…" or "data:image/…") is used as is.
 * @param basePath - The app's base path.
 * @param src - Root-relative path, absolute URL or image data URL.
 * @returns The URL.
 */
export function resolveFigureSrc(basePath: string, src: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(src)) return src;
  return getStaticImageSrc(basePath, src);
}

import type { ContainerRect, SlideImage } from "yet-another-react-lightbox";
import { getStaticImageSrc } from "../StaticImage/utils";
import { LABEL, VECTOR_MIN_SIZE, VECTOR_SCALE } from "./constants";
import type { ImageSize, LightboxFigureItem } from "./types";

/**
 * Builds the lightbox slide for a figure. The slide size comes from the image's natural size, scaled up for vector images so they fit the viewport and zoom past their natural size: by VECTOR_SCALE, or more if needed for the longer side to reach VECTOR_MIN_SIZE.
 * The natural size is read from the inline image, or else from the size the lightbox measured when it loaded the image. Without either, the slide has no size.
 * @param figure - Figure.
 * @param measuredSize - Natural size the lightbox measured for the figure's image, if any.
 * @returns The lightbox slide.
 */
export function buildSlide(
  figure: LightboxFigureItem,
  measuredSize?: ImageSize,
): SlideImage {
  const { alt, figureRef, src } = figure;
  const image = figureRef.current?.querySelector("img");
  const size = image?.naturalWidth
    ? { height: image.naturalHeight, width: image.naturalWidth }
    : measuredSize;
  const slide: SlideImage = { alt, src };
  if (!size?.width || !size.height) return slide;
  const scale = isVectorImage(src)
    ? Math.max(
        VECTOR_SCALE,
        VECTOR_MIN_SIZE / Math.max(size.width, size.height),
      )
    : 1;
  return { ...slide, height: size.height * scale, width: size.width * scale };
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
 * Returns the accessible name of a figure's expand button, e.g. "Expand figure: Map of sites", or "Expand figure" for a figure with no alt text.
 * @param alt - Image alt text.
 * @returns The expand button's accessible name.
 */
export function getExpandLabel(alt: string): string {
  return alt ? `${LABEL.EXPAND}: ${alt}` : LABEL.EXPAND;
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
 * Returns the lightbox dialog's accessible name: the shown figure's alt text, or "Figure" for a figure with no alt text.
 * @param figure - Shown figure, if any.
 * @returns The dialog's accessible name.
 */
export function getLightboxLabel(figure?: LightboxFigureItem): string {
  return figure?.alt || LABEL.FIGURE;
}

/**
 * Returns whether a URL is on another origin than the page. Data and blob URLs count as same-origin, as browsers download them with the download attribute.
 * @param url - URL, absolute or relative to the page.
 * @returns True if the URL is on another origin.
 */
export function isCrossOrigin(url: string): boolean {
  if (typeof window === "undefined" || /^(?:data|blob):/i.test(url)) {
    return false;
  }
  try {
    return new URL(url, window.location.href).origin !== window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Returns whether a URL is a data URL. Browsers block opening one in a new tab.
 * @param url - URL.
 * @returns True if the URL is a data URL.
 */
export function isDataUrl(url: string): boolean {
  return /^data:/i.test(url);
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
 * Returns whether a slide is a vector image (SVG), which the lightbox renders with VectorSlide.
 * @param slide - Slide.
 * @returns True if the slide is an SVG.
 */
export function isVectorSlide(slide: SlideImage): boolean {
  return isVectorImage(slide.src);
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

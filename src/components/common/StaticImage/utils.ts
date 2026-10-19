import type { ImageSrc } from "./staticImage";

/**
 * Returns the URL a static image is served from: the src prefixed with the app's base path, unless the src is an image data URL (starting with "data:image/").
 * @param basePath - The app's base path, e.g. from the Next.js router.
 * @param src - Root-relative path to a file in the app's public folder, without the base path, or an image data URL.
 * @returns The image URL.
 */
export function getStaticImageSrc(basePath: string, src: ImageSrc): string {
  if (src?.startsWith("data:image/")) return src;
  return `${basePath}${src}`;
}

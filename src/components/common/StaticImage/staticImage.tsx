import { useRouter } from "next/router";
import { JSX } from "react";
import { getStaticImageSrc } from "./utils";

export type ImageSrc = string | undefined;

/**
 * Props for the StaticImage component.
 */
export interface StaticImageProps {
  alt: string;
  height?: number;
  src: ImageSrc;
  width?: number;
}

/* eslint-disable @next/next/no-img-element -- allow static images for logos etc. */
/**
 * Image for static assets such as logos, rendered as a plain img element with no build-time optimization.
 * Use it for files in the app's public folder, passing a root-relative path without the base path, e.g. "/images/logo.png".
 * Prefixes the src with the app's base path, unless the src is an image data URL (starting with "data:image/").
 * @param props - Component props.
 * @param props.alt - Image alt text.
 * @param props.height - Image height.
 * @param props.src - Root-relative path to a file in the app's public folder, without the base path, or an image data URL.
 * @param props.width - Image width.
 * @returns The image.
 */
export const StaticImage = ({
  alt,
  height,
  src,
  width,
}: StaticImageProps): JSX.Element => {
  const router = useRouter();
  const srcValue = getStaticImageSrc(router.basePath, src);
  return <img alt={alt} height={height} src={srcValue} width={width} />;
};
/* eslint-enable @next/next/no-img-element -- allow static images for logos etc. */

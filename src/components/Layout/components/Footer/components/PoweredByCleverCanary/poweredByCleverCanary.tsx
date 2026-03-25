import { JSX } from "react";
import { ANCHOR_TARGET } from "../../../../../Links/common/entities";
import { Logo } from "../../../Header/components/Content/components/Logo/logo";
import { PoweredByCleverCanaryProps } from "./types";

/**
 * A component that displays a "Powered by CleverCanary" link with an image.
 *
 * @param props - Component props.
 * @param props.className - An optional class name for styling.
 * @param props.alt - The alt text for the image.
 * @param props.src - The source URL for the image.
 * @returns The rendered component or null if not powered by CleverCanary.
 */
export const PoweredByCleverCanary = ({
  alt = "Powered by CleverCanary",
  className,
  ...props /* StaticImageProps */
}: PoweredByCleverCanaryProps): JSX.Element | null => {
  if (!props.src) return null;
  return (
    <Logo
      alt={alt}
      className={className}
      height={32}
      link="https://www.clevercanary.com"
      src={props.src}
      target={ANCHOR_TARGET.BLANK}
    />
  );
};

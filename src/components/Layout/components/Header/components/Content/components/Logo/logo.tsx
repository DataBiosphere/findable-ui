import { JSX } from "react";
import {
  ImageSrc,
  StaticImage,
} from "../../../../../../../common/StaticImage/staticImage";
import { ANCHOR_TARGET } from "../../../../../../../Links/common/entities";
import { BaseComponentProps } from "../../../../../../../types";
import { StyledLink } from "./logo.styles";

/**
 * Props for the Logo component.
 */
export interface LogoProps extends BaseComponentProps {
  alt: string;
  height?: number;
  link: string;
  src: ImageSrc;
  target?: ANCHOR_TARGET;
  width?: number;
}

/**
 * Header logo, rendering the logo image as a link.
 * @param props - Component props.
 * @param props.alt - Logo image alt text.
 * @param props.className - Class name applied to the link.
 * @param props.height - Logo image height.
 * @param props.link - URL the logo links to.
 * @param props.src - Logo image source.
 * @param props.target - Link target; defaults to "_self".
 * @param props.width - Logo image width.
 * @returns The logo link.
 */
export const Logo = ({
  alt,
  className,
  height,
  link,
  src,
  target = ANCHOR_TARGET.SELF,
  width,
}: LogoProps): JSX.Element => {
  return (
    <StyledLink
      className={className}
      label={<StaticImage alt={alt} height={height} src={src} width={width} />}
      target={target}
      underline="none"
      url={link}
    />
  );
};

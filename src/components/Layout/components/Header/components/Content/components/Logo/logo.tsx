import React from "react";
import {
  ImageSrc,
  StaticImage,
} from "../../../../../../../common/StaticImage/staticImage";
import { ANCHOR_TARGET } from "../../../../../../../Links/common/entities";
import { StyledLink } from "./logo.styles";

export interface LogoProps {
  alt: string;
  className?: string;
  height?: number;
  link: string;
  src: ImageSrc;
  target?: ANCHOR_TARGET;
  width?: number;
}

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
      url={link}
    />
  );
};

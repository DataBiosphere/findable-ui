import React from "react";
import { BaseComponentProps } from "../../../../../../../../theme/common/types";
import {
  ImageSrc,
  StaticImage,
} from "../../../../../../../common/StaticImage/staticImage";
import { ANCHOR_TARGET } from "../../../../../../../Links/common/entities";
import { StyledLink } from "./logo.styles";

export interface LogoProps extends BaseComponentProps {
  alt: string;
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
      underline="none"
      url={link}
    />
  );
};

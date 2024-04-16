import React from "react";
import {
  StaticImage,
  StaticImageProps,
} from "../../../StaticImage/staticImage";
import { CardMedia as Media } from "./cardMedia.styles";

export interface CardMediaProps {
  media: StaticImageProps;
}

export const CardMedia = ({ media }: CardMediaProps): JSX.Element => {
  return (
    <Media>
      <StaticImage
        alt={media.alt}
        height={media.height}
        src={media.src}
        width={media.width}
      />
    </Media>
  );
};

import { JSX } from "react";
import {
  StaticImage,
  StaticImageProps,
} from "../../../StaticImage/staticImage";
import { CardMedia as Media } from "./cardMedia.styles";

/**
 * Props for the CardMedia component.
 */
export interface CardMediaProps {
  media: StaticImageProps;
}

/**
 * Card media, rendering the given static image.
 * @param props - Component props.
 * @param props.media - Image alt, height, src and width.
 * @returns The card media.
 */
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

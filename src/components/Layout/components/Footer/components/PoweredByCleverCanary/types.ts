import { StaticImageProps } from "../../../../../common/StaticImage/staticImage";
import { BaseComponentProps } from "../../../../../types";

export type PoweredByCleverCanaryProps = BaseComponentProps &
  Omit<StaticImageProps, "alt" | "src"> & {
    alt?: string;
    src?: StaticImageProps["src"];
  };

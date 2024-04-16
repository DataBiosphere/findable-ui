import { IconButtonProps as MIconButtonProps } from "@mui/material";
import React, {
  CSSProperties,
  ElementType,
  forwardRef,
  ReactNode,
} from "react";
import { ANCHOR_TARGET } from "../../Links/common/entities";
import { IconButtonSocials } from "../IconButton/iconButton.styles";
import { Socials as IconButtons } from "./socials.styles";

export interface Social {
  Icon: ElementType;
  label: ReactNode;
  url: string;
}

export interface SocialsProps {
  buttonSize?: MIconButtonProps["size"];
  className?: string;
  IconButtonElType?: ElementType;
  socials: Social[];
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export const Socials = forwardRef<HTMLDivElement, SocialsProps>(
  function Socials(
    {
      buttonSize = "medium",
      className,
      IconButtonElType = IconButtonSocials,
      socials,
      style,
    }: SocialsProps,
    ref
  ): JSX.Element {
    return (
      <IconButtons className={className} ref={ref} style={style}>
        {socials.map(({ Icon, url }, i) => (
          <IconButtonElType
            key={i}
            href={url}
            rel="noopener noreferrer"
            size={buttonSize}
            target={ANCHOR_TARGET.BLANK}
          >
            <Icon fontSize="small" />
          </IconButtonElType>
        ))}
      </IconButtons>
    );
  }
);

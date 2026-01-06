import {
  IconButtonProps as MIconButtonProps,
  IconProps as MIconProps,
} from "@mui/material";
import { JSX, ElementType } from "react";
import { Button } from "./iconButton.styles";

/**
 * Basic icon button component.
 * Use IconButtonSecondary styles to render secondary icon button.
 */

export interface IconButtonProps extends MIconButtonProps {
  className?: string;
  Icon: ElementType;
  iconProps?: MIconProps;
  open?: boolean;
}

export const IconButton = ({
  className,
  Icon,
  iconProps = { fontSize: "small" },
  open = false,
  size = "large",
  ...props /* Spread props to allow for Mui IconButtonProps specific prop overrides e.g. "onClick". */
}: IconButtonProps): JSX.Element => {
  return (
    <Button className={className} open={open} size={size} {...props}>
      <Icon {...iconProps} />
    </Button>
  );
};

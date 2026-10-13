import {
  IconButtonProps as MIconButtonProps,
  IconProps as MIconProps,
} from "@mui/material";
import { ElementType, JSX } from "react";
import { Button } from "./iconButton.styles";

/**
 * Props for the IconButton component.
 */
export interface IconButtonProps extends MIconButtonProps {
  className?: string;
  Icon: ElementType;
  iconProps?: MIconProps;
  open?: boolean;
}

/**
 * Basic icon button component.
 * Use IconButtonSecondary styles to render secondary icon button.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @param props.Icon - Icon component.
 * @param props.iconProps - Props passed to the icon; defaults to a small font size.
 * @param props.open - Whether the button is in its open state; defaults to false.
 * @param props.size - Button size; defaults to "large".
 * @returns The icon button.
 */
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

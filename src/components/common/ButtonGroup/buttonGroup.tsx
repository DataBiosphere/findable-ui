import {
  ButtonGroup as MButtonGroup,
  ButtonGroupProps as MButtonGroupProps,
} from "@mui/material";
import { JSX, Fragment, ReactElement } from "react";
import { ButtonGroupButton } from "./components/ButtonGroupButton/buttonGroupButton";

/**
 * An extension of the basic Mui ButtonGroup component with available ButtonGroup props.
 */

export interface ButtonGroupProps {
  Buttons: (ReactElement<typeof ButtonGroupButton> | null)[];
  className?: string;
  color?: MButtonGroupProps["color"];
  disabled?: boolean;
  fullWidth?: boolean;
  orientation?: MButtonGroupProps["orientation"];
  size?: MButtonGroupProps["size"];
  variant?: MButtonGroupProps["variant"];
}

export const ButtonGroup = ({
  Buttons,
  className,
  color = "primary",
  disabled = false,
  fullWidth = false,
  orientation = "horizontal",
  size = "small",
  variant = "contained",
  ...props
}: ButtonGroupProps): JSX.Element => {
  return (
    <MButtonGroup
      className={className}
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      orientation={orientation}
      size={size}
      variant={variant}
      {...props}
    >
      {Buttons.map((Button, i) => (
        <Fragment key={`button-${i}`}>{Button}</Fragment>
      ))}
    </MButtonGroup>
  );
};

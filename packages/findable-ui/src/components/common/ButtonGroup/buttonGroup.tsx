import {
  ButtonGroup as MButtonGroup,
  ButtonGroupProps as MButtonGroupProps,
} from "@mui/material";
import React, { Fragment, ReactElement } from "react";
import { ButtonGroupButton } from "./components/ButtonGroupButton/buttonGroupButton";

/**
 * An extension of the basic Mui ButtonGroup component with available ButtonGroup props.
 */

export interface ButtonGroupProps {
  Buttons: (ReactElement<typeof ButtonGroupButton> | null)[];
  color?: MButtonGroupProps["color"];
  disabled?: boolean;
  fullWidth?: boolean;
  orientation?: MButtonGroupProps["orientation"];
  size?: MButtonGroupProps["size"];
  variant?: MButtonGroupProps["variant"];
}

export const ButtonGroup = ({
  Buttons,
  color = "primary",
  disabled = false,
  fullWidth = false,
  orientation = "horizontal",
  size = "small",
  variant = "contained",
}: ButtonGroupProps): JSX.Element => {
  return (
    <MButtonGroup
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      orientation={orientation}
      size={size}
      variant={variant}
    >
      {Buttons.map((Button, i) => (
        <Fragment key={`button-${i}`}>{Button}</Fragment>
      ))}
    </MButtonGroup>
  );
};

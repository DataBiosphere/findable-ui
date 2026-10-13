import {
  ButtonGroup as MButtonGroup,
  ButtonGroupProps as MButtonGroupProps,
} from "@mui/material";
import { Fragment, JSX, ReactElement } from "react";
import { ButtonGroupButton } from "./components/ButtonGroupButton/buttonGroupButton";

/**
 * Props for the ButtonGroup component.
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

/**
 * An extension of the basic Mui ButtonGroup component with available ButtonGroup props.
 * @param props - Component props.
 * @param props.Buttons - Buttons to render in the group.
 * @param props.className - Class name applied to the button group.
 * @param props.color - Button group color; defaults to "primary".
 * @param props.disabled - Whether the button group is disabled; defaults to false.
 * @param props.fullWidth - Whether the button group takes the full width of its container; defaults to false.
 * @param props.orientation - Button group orientation; defaults to "horizontal".
 * @param props.size - Button group size; defaults to "small".
 * @param props.variant - Button group variant; defaults to "contained".
 * @returns The button group.
 */
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

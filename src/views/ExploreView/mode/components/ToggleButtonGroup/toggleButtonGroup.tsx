import { ToggleButton, ToggleButtonGroupProps } from "@mui/material";
import { JSX } from "react";
import { TOGGLE_BUTTON_GROUP_PROPS, TOGGLE_BUTTONS } from "./constants";
import { StyledToggleButtonGroup } from "./toggleButtonGroup.styles";

export const ToggleButtonGroup = ({
  className,
  ...props /* ToggleButtonGroupProps */
}: ToggleButtonGroupProps): JSX.Element | null => {
  if (!props.onChange) return null;
  return (
    <StyledToggleButtonGroup
      className={className}
      {...TOGGLE_BUTTON_GROUP_PROPS}
      {...props}
    >
      {TOGGLE_BUTTONS.map((tButtonProps) => (
        <ToggleButton key={tButtonProps.value} {...tButtonProps} />
      ))}
    </StyledToggleButtonGroup>
  );
};

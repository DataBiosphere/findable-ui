import { ToggleButton, ToggleButtonGroupProps } from "@mui/material";
import { JSX } from "react";
import { TOGGLE_BUTTON_GROUP_PROPS, TOGGLE_BUTTONS } from "./constants";
import { StyledToggleButtonGroup } from "./toggleButtonGroup.styles";

/**
 * ToggleButtonGroup component for ExploreView. Renders a group of toggle buttons based on the provided props.
 * Switches between "Search" mode for filter-driven exploration and "Research" mode for AI-assisted discovery.
 * @param props - Component props.
 * @param props.className - Class name.
 * @returns Rendered component or null if onChange prop is not provided.
 */
export const ToggleButtonGroup = ({
  className,
  ...props /* ToggleButtonGroupProps */
}: Omit<ToggleButtonGroupProps, "children">): JSX.Element | null => {
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

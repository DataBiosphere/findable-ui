import {
  ToggleButton as MToggleButton,
  ToggleButtonGroup as MToggleButtonGroup,
  ToggleButtonGroupProps as MToggleButtonGroupProps,
  ToggleButtonProps as MToggleButtonProps,
} from "@mui/material";
import React, { MouseEvent, useState } from "react";

/**
 * An extension of the basic Mui ToggleButtonGroup component with available ToggleButtonGroup props.
 */

export type OnToggleButtonFn = () => void; // Function invoked when selected toggle button value changes.
type ToggleButtonValue = MToggleButtonProps["value"];
type ToggleButtonGroupValue = MToggleButtonGroupProps["value"];

export interface ToggleButton {
  label: string;
  onToggle: OnToggleButtonFn;
  value: ToggleButtonValue;
}

export interface ToggleButtonGroupProps {
  toggleButtons: ToggleButton[];
}

/**
 * Returns the selected toggle button action.
 * @param toggleButtons - Toggle buttons.
 * @param toggleValue - Selected value within the group.
 * @returns the selected toggle button action.
 */
function getSelectedToggleButtonAction(
  toggleButtons: ToggleButton[],
  toggleValue: ToggleButtonGroupValue
): OnToggleButtonFn | undefined {
  return toggleButtons.find(({ value }) => value === toggleValue)?.onToggle;
}

export const ToggleButtonGroup = ({
  toggleButtons,
  ...props
}: ToggleButtonGroupProps): JSX.Element => {
  const [toggleValue, setToggleValue] = useState<ToggleButtonGroupValue>(
    toggleButtons[0]?.value
  );

  /**
   * Callback fired when toggle button value changes.
   * - Sets state toggleValue to selected value.
   * - Executes onToggle action as defined by selected toggle button.
   * @param mouseEvent - The event source of the callback.
   * @param newToggleValue - The value of the selected toggle button.
   * @param onToggleFn - The selected toggle button action.
   */
  const onChangeToggleButton = (
    mouseEvent: MouseEvent<HTMLElement>,
    newToggleValue: ToggleButtonGroupValue,
    onToggleFn: OnToggleButtonFn | undefined
  ): void => {
    if (newToggleValue) {
      setToggleValue(newToggleValue);
      if (onToggleFn) onToggleFn();
    }
  };

  return (
    <MToggleButtonGroup
      exclusive
      onChange={(e, value): void =>
        onChangeToggleButton(
          e,
          value,
          getSelectedToggleButtonAction(toggleButtons, value)
        )
      }
      value={toggleValue}
      {...props}
    >
      {toggleButtons.map(({ label, value }) => (
        <MToggleButton key={label} value={value}>
          {label}
        </MToggleButton>
      ))}
    </MToggleButtonGroup>
  );
};

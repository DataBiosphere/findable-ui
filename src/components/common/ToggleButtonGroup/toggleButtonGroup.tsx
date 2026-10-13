import {
  ToggleButton as MToggleButton,
  ToggleButtonGroup as MToggleButtonGroup,
  ToggleButtonGroupProps as MToggleButtonGroupProps,
  ToggleButtonProps as MToggleButtonProps,
} from "@mui/material";
import { JSX, MouseEvent, useState } from "react";

export type OnToggleButtonFn = () => void; // Function invoked when selected toggle button value changes.
type ToggleButtonValue = MToggleButtonProps["value"];
type ToggleButtonGroupValue = MToggleButtonGroupProps["value"];

/**
 * Toggle button configuration.
 */
export interface ToggleButton {
  label: string;
  onToggle: OnToggleButtonFn;
  value: ToggleButtonValue;
}

/**
 * Props for the ToggleButtonGroup component.
 */
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
  toggleValue: ToggleButtonGroupValue,
): OnToggleButtonFn | undefined {
  return toggleButtons.find(({ value }) => value === toggleValue)?.onToggle;
}

/**
 * Renders an exclusive Mui toggle button group with the first toggle button selected, and invokes the selected toggle button's onToggle action on change, ignoring falsy values.
 * @param props - Component props.
 * @param props.toggleButtons - Toggle buttons.
 * @returns The toggle button group.
 */
export const ToggleButtonGroup = ({
  toggleButtons,
  ...props
}: ToggleButtonGroupProps): JSX.Element => {
  const [toggleValue, setToggleValue] = useState<ToggleButtonGroupValue>(
    toggleButtons[0]?.value,
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
    onToggleFn: OnToggleButtonFn | undefined,
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
          getSelectedToggleButtonAction(toggleButtons, value),
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

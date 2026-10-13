import { ToggleButtonGroupProps } from "@mui/material";
import { MouseEvent, useCallback, useState } from "react";

/**
 * Manages the selected value of an exclusive toggle button group, ignoring falsy values, so clicking the selected button does not deselect it.
 * @param initialValue - Initially selected value; defaults to null.
 * @returns The group's onChange handler and selected value.
 */
export const useToggleButtonGroup = <
  TValue extends ToggleButtonGroupProps["value"],
>(
  initialValue: TValue | null = null,
): ToggleButtonGroupProps => {
  const [value, setValue] = useState<TValue | null>(initialValue);

  const onChange = useCallback((_: MouseEvent, value: TValue) => {
    if (!value) return;
    setValue(value);
  }, []);

  return { onChange, value };
};

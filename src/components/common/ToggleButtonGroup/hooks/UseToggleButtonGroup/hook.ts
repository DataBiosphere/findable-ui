import { ToggleButtonGroupProps } from "@mui/material";
import { MouseEvent, useCallback, useState } from "react";

export const useToggleButtonGroup = <
  TValue extends ToggleButtonGroupProps["value"]
>(
  initialValue: TValue | null = null
): ToggleButtonGroupProps => {
  const [value, setValue] = useState<TValue | null>(initialValue);

  const onChange = useCallback((_: MouseEvent, value: TValue) => {
    if (!value) return;
    setValue(value);
  }, []);

  return { onChange, value };
};

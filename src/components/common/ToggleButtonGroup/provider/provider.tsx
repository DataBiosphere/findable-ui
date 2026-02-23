import { ToggleButtonGroupProps } from "@mui/material";
import { JSX, MouseEvent, useCallback, useState } from "react";
import { ToggleButtonGroupContext } from "./context";
import { ToggleButtonGroupProviderProps } from "./types";

/**
 * ToggleButtonGroup provider component.
 * Manages toggle button group state for child components.
 * @param props - Component props.
 * @param props.children - Child elements to render.
 * @param props.initialValue - Initial value for the toggle button group.
 * @returns ToggleButtonGroup provider component.
 */
export function ToggleButtonGroupProvider<
  T extends ToggleButtonGroupProps["value"],
>({
  children,
  initialValue = null,
}: ToggleButtonGroupProviderProps<T>): JSX.Element {
  const [value, setValue] = useState<T | null>(initialValue);

  const onChange = useCallback(
    (_: MouseEvent<HTMLElement>, value: T | null) => {
      if (value === null) return;
      setValue(value);
    },
    [],
  );

  return (
    <ToggleButtonGroupContext.Provider value={{ onChange, value }}>
      {typeof children === "function"
        ? children({ onChange, value })
        : children}
    </ToggleButtonGroupContext.Provider>
  );
}

import { ToggleButtonGroupProps } from "@mui/material";
import { useContext } from "react";
import { ToggleButtonGroupContext } from "./context";
import { ToggleButtonGroupContextProps } from "./types";

/**
 * Returns the toggle button group context.
 * @returns toggle button group context.
 */
export const useToggleButtonGroup = <
  T extends ToggleButtonGroupProps["value"],
>(): ToggleButtonGroupContextProps<T> => {
  return useContext(
    ToggleButtonGroupContext,
  ) as ToggleButtonGroupContextProps<T>;
};

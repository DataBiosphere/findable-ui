import { ToggleButtonGroupProps } from "@mui/material";
import { ReactNode } from "react";

export type ToggleButtonGroupContextProps<
  T extends ToggleButtonGroupProps["value"],
> = Pick<ToggleButtonGroupProps, "onChange"> & {
  value: T | null;
};

export type ToggleButtonGroupProviderProps<
  T extends ToggleButtonGroupProps["value"],
> = {
  children:
    | ReactNode
    | ((props: ToggleButtonGroupContextProps<T>) => ReactNode);
  initialValue?: T | null;
};

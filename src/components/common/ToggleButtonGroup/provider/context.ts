import { createContext } from "react";
import { ToggleButtonGroupContextProps } from "./types";

export const ToggleButtonGroupContext = createContext<
  ToggleButtonGroupContextProps<unknown>
>({
  onChange: undefined,
  value: null,
});

import { ReactNode } from "react";
import { ToggleButtonGroupContextProps } from "../../../../components/common/ToggleButtonGroup/provider/types";
import { MODE } from "../types";

export type ModeContextProps = Partial<ToggleButtonGroupContextProps<MODE>>;

export type ModeProviderProps = {
  children: ReactNode | ((props: ModeContextProps) => ReactNode);
};

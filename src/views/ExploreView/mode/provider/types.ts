import { ReactNode } from "react";
import { ToggleButtonGroupContextProps } from "../../../../components/common/ToggleButtonGroup/provider/types";
import { MODE } from "../types";

export type ModeContextProps = Pick<
  ToggleButtonGroupContextProps<MODE>,
  "onChange"
> & {
  value: MODE;
};

export type ModeProviderProps = {
  children: ReactNode | ((props: ModeContextProps) => ReactNode);
};

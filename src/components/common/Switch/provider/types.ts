import { SwitchProps } from "@mui/material";
import { ReactNode } from "react";

export type SwitchContextProps = Pick<SwitchProps, "checked" | "onChange">;

export type SwitchProviderProps = {
  children: ReactNode | ((props: SwitchContextProps) => ReactNode);
};

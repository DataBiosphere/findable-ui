import { DrawerProps } from "@mui/material";
import { ReactNode } from "react";

export type DrawerTransitionContextProps = Pick<DrawerProps, "variant">;

export interface DrawerTransitionProviderProps extends Pick<
  DrawerProps,
  "variant"
> {
  children: ReactNode | ((props: DrawerTransitionContextProps) => ReactNode);
}

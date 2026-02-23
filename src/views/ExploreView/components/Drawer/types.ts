import { ReactNode } from "react";
import { DrawerTransitionContextProps } from "./provider/types";

export interface DrawerProps {
  children: ReactNode | ((props: DrawerTransitionContextProps) => ReactNode);
}

import { createContext } from "react";
import { DrawerTransitionContextProps } from "./types";
import { DRAWER_PROPS } from "../../../../../styles/common/mui/drawer";

export const DrawerTransitionContext =
  createContext<DrawerTransitionContextProps>({
    variant: DRAWER_PROPS.VARIANT.TEMPORARY,
  });

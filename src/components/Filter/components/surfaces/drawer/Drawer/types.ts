import { DrawerProps as MDrawerProps } from "@mui/material";
import { ComponentType } from "react";
import type { BaseComponentProps } from "../../../../../types";
import type { SurfaceProps } from "../../types";
import type { ButtonProps } from "../components/Button/types";

export interface DrawerProps
  extends BaseComponentProps,
    Omit<MDrawerProps, "children">,
    SurfaceProps {
  Button?: ComponentType<ButtonProps>;
}

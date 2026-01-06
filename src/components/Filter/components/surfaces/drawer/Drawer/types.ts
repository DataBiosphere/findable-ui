import { DrawerProps as MDrawerProps } from "@mui/material";
import { BaseComponentProps } from "../../../../../types";
import { SurfaceProps } from "../../types";
import { Button } from "../components/Button/button";

export interface DrawerProps
  extends BaseComponentProps, Omit<MDrawerProps, "children">, SurfaceProps {
  Button?: typeof Button;
}

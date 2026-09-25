import { DrawerProps as MDrawerProps } from "@mui/material";
import { BaseComponentProps } from "../../../../../types";
import { SurfaceProps } from "../../types";
import { Button } from "../components/Button/button";

export type PaperSlotProps = NonNullable<MDrawerProps["slotProps"]>["paper"];

export interface DrawerProps
  extends BaseComponentProps, Omit<MDrawerProps, "children">, SurfaceProps {
  Button?: typeof Button;
}

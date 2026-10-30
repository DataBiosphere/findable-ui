import { BackdropProps as MBackdropProps } from "@mui/material";
import { SURFACE_TYPE } from "../../../surfaces/types";

/**
 * Props for the filter Backdrop component.
 */
export interface BackdropProps extends Omit<MBackdropProps, "onClick"> {
  onClick: () => void;
  surfaceType?: SURFACE_TYPE;
}

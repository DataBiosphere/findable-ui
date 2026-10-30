import { BackdropProps as MBackdropProps } from "@mui/material";

/**
 * Props for the filter Backdrop component.
 */
export interface BackdropProps extends Omit<MBackdropProps, "onClick"> {
  onClick: () => void;
}

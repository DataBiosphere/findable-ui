import { BackdropProps as MBackdropProps } from "@mui/material";

export interface BackdropProps extends Omit<MBackdropProps, "onClick"> {
  onClick: () => void;
}

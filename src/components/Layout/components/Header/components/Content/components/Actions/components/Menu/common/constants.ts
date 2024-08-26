import { DialogProps as MDialogProps } from "@mui/material";

export const DIALOG_PROPS: Partial<MDialogProps> = {
  PaperProps: { elevation: 0 },
  TransitionProps: { easing: "ease-out" },
  fullScreen: true,
  hideBackdrop: true,
  keepMounted: false,
};

import { DialogProps as MDialogProps } from "@mui/material";

export const DIALOG_PROPS: Partial<MDialogProps> = {
  PaperProps: { elevation: 0 },
  fullScreen: true,
  hideBackdrop: true,
  keepMounted: false,
  transitionDuration: 300,
};

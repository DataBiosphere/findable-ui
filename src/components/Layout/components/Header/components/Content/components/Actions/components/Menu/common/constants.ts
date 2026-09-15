import { DialogProps as MDialogProps } from "@mui/material";

export const ARIA_LABEL = {
  OPEN_MENU: "Open menu",
} as const;

export const DIALOG_PROPS: Partial<MDialogProps> = {
  PaperProps: { elevation: 0 },
  TransitionProps: { easing: "ease-out" },
  fullScreen: true,
  hideBackdrop: true,
  keepMounted: false,
};

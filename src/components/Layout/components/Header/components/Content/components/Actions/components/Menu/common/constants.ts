import { DialogProps as MDialogProps, PaperProps } from "@mui/material";

export const ARIA_LABEL = {
  // Names the fullscreen dialog itself. Its only heading-like content is the
  // logo, which is an image, so without this the dialog is announced unnamed.
  MENU: "Menu",
  OPEN_MENU: "Open menu",
} as const;

/**
 * Props for the dialog's paper. MUI puts `role="dialog"` and the accessible
 * name on the paper, not on the modal root that `Dialog`'s own props land on,
 * so the name and the id `aria-controls` targets both have to be set here.
 */
export const DIALOG_PAPER_PROPS: PaperProps = {
  "aria-label": ARIA_LABEL.MENU,
  elevation: 0,
};

export const DIALOG_PROPS: Partial<MDialogProps> = {
  TransitionProps: { easing: "ease-out" },
  fullScreen: true,
  hideBackdrop: true,
  keepMounted: false,
};

import { DrawerProps as MDrawerProps } from "@mui/material";

export const DEFAULT_DRAWER_PROPS: Partial<MDrawerProps> = {
  PaperProps: {
    elevation: 2,
  },
  SlideProps: { appear: true },
  anchor: "right",
  disableEnforceFocus: true,
  disableScrollLock: true,
  hideBackdrop: true,
};

import { DrawerProps } from "@mui/material";

export const ARIA_LABEL = {
  // Names the drawer dialog, which MUI leaves unnamed. It matches the visible
  // "Filters" title that Controls renders; that title has no id to reference
  // with aria-labelledby, and a label here also lets a caller's own name win.
  // Keep the two in step if the title changes.
  FILTERS: "Filters",
} as const;

export const DRAWER_PROPS: DrawerProps = {
  closeAfterTransition: true,
  disableRestoreFocus: true,
  elevation: 1,
};

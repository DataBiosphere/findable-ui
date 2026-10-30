import { GridProps, MenuProps } from "@mui/material";

export const GRID_PROPS: GridProps = {
  alignItems: "center",
  container: true,
  direction: "row",
  gap: 1,
};

export const MENU_PROPS: Omit<MenuProps, "anchorEl" | "onClose" | "open"> = {
  anchorOrigin: {
    horizontal: "right",
    vertical: "bottom",
  },
  /* Prevents the browser from auto‑focusing the menu on open, which can trigger a scrollIntoView jump when the viewport has `scroll-padding-top` (e.g., on <html>). */
  disableAutoFocus: true,
  /* Skips MUI's focus restore, which would trigger a similar scroll adjustment with `scroll-padding-top`; focus is restored without scrolling instead (see useScrollWithPage). */
  disableRestoreFocus: true,
  /* Lets the page scroll while the menu is open; the menu repositions on scroll to follow its button. */
  disableScrollLock: true,
  marginThreshold: 8,
  slotProps: {
    list: { component: "div" },
    paper: { variant: "menu" },
  },
  transformOrigin: {
    horizontal: "right",
    vertical: "top",
  },
};

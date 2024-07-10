import {
  AppBarProps as MAppBarProps,
  ToolbarProps as MToolbarProps,
} from "@mui/material";

export const HEADER_HEIGHT = 56;

export const APP_BAR_PROPS: Partial<MAppBarProps> = {
  elevation: 1,
  position: "fixed",
};

export const FADE_TRANSITION_PROPS = {
  appear: false,
  timeout: 0,
  unmountOnExit: true,
};

export const TOOLBAR_PROPS: Partial<MToolbarProps> = {
  variant: "dense",
};

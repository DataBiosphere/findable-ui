import {
  AppBarProps as MAppBarProps,
  ToolbarProps as MToolbarProps,
} from "@mui/material";

export const HEADER_HEIGHT = 56;

export const APP_BAR_PROPS: Partial<MAppBarProps> = {
  elevation: 1,
  /**
   * In flow, so nothing below has to know the header's height — including
   * whether any `announcements` are rendered, or how tall they are. Content
   * scrolls in `ScrollShell` rather than in the document, so the header does not
   * travel even though it is no longer `fixed`, and it keeps its place during
   * rubber-band overscroll. `sticky` rather than `static` for the z-index: MUI
   * applies `zIndex.appBar` to the former and nothing to the latter, and the
   * shell's positioned descendants would otherwise paint over the header.
   */
  position: "sticky",
};

export const FADE_TRANSITION_PROPS = {
  appear: false,
  timeout: 0,
  unmountOnExit: true,
};

export const TOOLBAR_PROPS: Partial<MToolbarProps> = {
  variant: "dense",
};

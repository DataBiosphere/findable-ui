import { PopperProps } from "@mui/material";
import { POPPER_PROPS as MUI_POPPER_PROPS } from "../../../../../../styles/common/mui/popper";
import { UPDATE_AFTER_SCROLL_MODIFIER } from "../../../../common/popper";

export const POPPER_PROPS: Omit<PopperProps, "open"> = {
  placement: MUI_POPPER_PROPS.PLACEMENT.BOTTOM_START,
  popperOptions: {
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: [
            MUI_POPPER_PROPS.PLACEMENT.TOP_START,
            MUI_POPPER_PROPS.PLACEMENT.RIGHT,
          ],
        },
      },
      { name: "offset", options: { offset: [0, 4] } },
    ],
  },
  transition: true,
};

/**
 * Popper options over the menu surface. The panel is fixed to the window: its label sits in the sticky sidebar, so an absolutely positioned panel would move with the page for a frame before popper.js moved it back, and bounce. It also updates after each scroll, of the page or of the sidebar.
 */
export const MENU_POPPER_OPTIONS: NonNullable<PopperProps["popperOptions"]> = {
  ...POPPER_PROPS.popperOptions,
  modifiers: [
    ...(POPPER_PROPS.popperOptions?.modifiers ?? []),
    UPDATE_AFTER_SCROLL_MODIFIER,
  ],
  strategy: "fixed",
};

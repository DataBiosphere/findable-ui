import type {
  AutocompleteCloseReason,
  PaperProps,
  PopperProps,
} from "@mui/material";
import { UPDATE_AFTER_SCROLL_MODIFIER } from "../../../common/popper";
import { DividerItem, ITEM_TYPE, NoResultsItem } from "./entities";

export const CLOSE_REASON = {
  BLUR: "blur",
  ESCAPE: "escape",
} as const satisfies Record<string, AutocompleteCloseReason>;

export const DEFAULT_LIST_HEIGHT = 0;

export const DIVIDER_HEIGHT = 17;

export const IME_KEY_CODE = 229;

export const KEY = {
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ENTER: "Enter",
  ESCAPE: "Escape",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  TAB: "Tab",
} as const;

export const OPTION_SELECTOR = "[role='option']";

/**
 * Autocomplete options: a single placeholder, as VariableSizeList renders the list. It never equals the search term, so Mui never highlights it, nor points the input's aria-activedescendant at it, as it would an empty search matching an empty string option.
 */
export const PLACEHOLDER_OPTIONS = ["\u0000"];

export const POPPER_MENU_PAPER_PROPS: Partial<PaperProps> = { variant: "menu" };

export const POPPER_MENU_POPPER_PROPS: Partial<PopperProps> = {
  modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
  placement: "bottom-start",
  /* Fixed to the window: the input sits in the sticky sidebar, so an absolutely positioned list would bounce as the page scrolls. */
  popperOptions: {
    modifiers: [UPDATE_AFTER_SCROLL_MODIFIER],
    strategy: "fixed",
  },
};

export const POPPER_DRAWER_PAPER_PROPS: Partial<PaperProps> = { elevation: 0 };

export const STEP = {
  NEXT: 1,
  PREVIOUS: -1,
} as const;

export const POPPER_DRAWER_POPPER_PROPS: Partial<PopperProps> = {
  modifiers: [{ name: "offset", options: { offset: [-16, 8] } }],
  popperOptions: { strategy: "absolute" },
};

export const DIVIDER_ITEM: DividerItem = {
  type: ITEM_TYPE.DIVIDER,
};

export const NO_RESULTS_ITEM: NoResultsItem = {
  key: "noResults",
  type: ITEM_TYPE.NO_RESULTS,
};

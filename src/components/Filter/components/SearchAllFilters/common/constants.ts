import { AutocompleteProps, PaperProps, PopperProps } from "@mui/material";
import { UPDATE_AFTER_SCROLL_MODIFIER } from "../../../common/popper";
import { DividerItem, ITEM_TYPE, NoResultsItem } from "./entities";

export const DEFAULT_LIST_HEIGHT = 0;

export const DIVIDER_HEIGHT = 17;

const POPPER_MENU_PAPER_PROPS: Partial<PaperProps> = { variant: "menu" };

const POPPER_MENU_POPPER_PROPS: Partial<PopperProps> = {
  modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
  placement: "bottom-start",
  /* Fixed to the window: the input sits in the sticky sidebar, so an absolutely positioned list would bounce as the page scrolls. */
  popperOptions: {
    modifiers: [UPDATE_AFTER_SCROLL_MODIFIER],
    strategy: "fixed",
  },
};

export const POPPER_MENU_SLOT_PROPS: AutocompleteProps<
  string,
  false,
  false,
  true
>["slotProps"] = {
  paper: POPPER_MENU_PAPER_PROPS,
  popper: POPPER_MENU_POPPER_PROPS,
};

const POPPER_DRAWER_PAPER_PROPS: Partial<PaperProps> = { elevation: 0 };

const POPPER_DRAWER_POPPER_PROPS: Partial<PopperProps> = {
  modifiers: [{ name: "offset", options: { offset: [-16, 8] } }],
  popperOptions: { strategy: "absolute" },
};

export const POPPER_DRAWER_SLOT_PROPS: AutocompleteProps<
  string,
  false,
  false,
  true
>["slotProps"] = {
  paper: POPPER_DRAWER_PAPER_PROPS,
  popper: POPPER_DRAWER_POPPER_PROPS,
};

export const DIVIDER_ITEM: DividerItem = {
  type: ITEM_TYPE.DIVIDER,
};

export const NO_RESULTS_ITEM: NoResultsItem = {
  key: "noResults",
  type: ITEM_TYPE.NO_RESULTS,
};

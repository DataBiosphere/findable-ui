import { PaperProps, PopperProps } from "@mui/material";
import { DividerItem, ITEM_TYPE, NoResultsItem } from "./entites";

export const DEFAULT_LIST_HEIGHT = 0;

export const DIVIDER_HEIGHT = 17;

export const DEFAULT_PAPER_PROPS: Partial<PaperProps> = {
  sx: {
    width: 368,
  },
  variant: "menu",
};
export const DEFAULT_POPPER_PROPS: Partial<PopperProps> = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
    },
  ],
  placement: "bottom-start",
};

export const DEFAULT_SLOT_PROPS = {
  paper: DEFAULT_PAPER_PROPS,
  popper: DEFAULT_POPPER_PROPS,
};

export const DRAWER_PAPER_PROPS: Partial<PaperProps> = {
  elevation: 0,
  sx: {
    width: 312,
  },
};

export const DRAWER_POPPER_PROPS: Partial<PopperProps> = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [-16, 8],
      },
    },
  ],
  popperOptions: { strategy: "absolute" },
};

export const DRAWER_SLOT_PROPS = {
  paper: DRAWER_PAPER_PROPS,
  popper: DRAWER_POPPER_PROPS,
};

export const DIVIDER_ITEM: DividerItem = {
  type: ITEM_TYPE.DIVIDER,
};

export const NO_RESULTS_ITEM: NoResultsItem = {
  key: "noResults",
  type: ITEM_TYPE.NO_RESULTS,
};

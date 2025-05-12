import { fn } from "@storybook/test";
import { ComponentProps } from "react";
import { DONOR_COUNT, GENUS_SPECIES } from "../../Filters/stories/constants";
import { Filter } from "../filter";

export const SELECT_ARGS: ComponentProps<typeof Filter> = {
  categoryView: GENUS_SPECIES,
  isFilterDrawer: false,
  onFilter: fn(),
};

export const DISABLED_SELECT_ARGS: ComponentProps<typeof Filter> = {
  ...SELECT_ARGS,
  categoryView: {
    ...SELECT_ARGS.categoryView,
    isDisabled: true,
  },
};

export const RANGE_ARGS: ComponentProps<typeof Filter> = {
  categoryView: DONOR_COUNT,
  isFilterDrawer: false,
  onFilter: fn(),
};

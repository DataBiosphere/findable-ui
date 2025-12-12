import { ComponentProps } from "react";
import { fn } from "storybook/test";
import {
  BIOLOGICAL_SEX,
  DONOR_COUNT,
  GENUS_SPECIES,
} from "../../Filters/stories/constants";
import { SURFACE_TYPE } from "../../surfaces/types";
import { SearchAllFilters } from "../searchAllFilters";

export const DEFAULT_ARGS: ComponentProps<typeof SearchAllFilters> = {
  categoryViews: [BIOLOGICAL_SEX, GENUS_SPECIES, DONOR_COUNT],
  onFilter: fn(),
  surfaceType: SURFACE_TYPE.POPPER_MENU,
};

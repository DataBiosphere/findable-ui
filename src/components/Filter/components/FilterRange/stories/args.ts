import { ComponentProps } from "react";
import { fn } from "storybook/test";
import { SURFACE_TYPE } from "../../surfaces/types";
import { FilterRange } from "../filterRange";

export const DEFAULT_ARGS: ComponentProps<typeof FilterRange> = {
  categoryKey: "Weight",
  categoryLabel: "Weight",
  max: 2100,
  min: 100,
  onCloseFilter: fn(),
  onFilter: fn(),
  selectedMax: null,
  selectedMin: null,
  surfaceType: SURFACE_TYPE.MENU,
  unit: "kg",
};

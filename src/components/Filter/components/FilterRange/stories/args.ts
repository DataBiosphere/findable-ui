import { fn } from "@storybook/test";
import { ComponentProps } from "react";
import { FilterRange } from "../filterRange";

export const DEFAULT_ARGS: ComponentProps<typeof FilterRange> = {
  categoryKey: "Weight",
  categoryLabel: "Weight",
  isFilterDrawer: false,
  max: 2100,
  min: 100,
  onCloseFilter: fn(),
  onFilter: fn(),
  selectedMax: undefined,
  selectedMin: undefined,
  unit: "kg",
};

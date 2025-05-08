import { fn } from "@storybook/test";
import { ComponentProps } from "react";
import { Filters } from "../filters";
import {
  BIOLOGICAL_SEX,
  DONOR_COUNT,
  FILE_FORMAT,
  FILE_TYPE,
  GENUS_SPECIES,
} from "./constants";

export const DEFAULT_ARGS: ComponentProps<typeof Filters> = {
  categoryFilters: [
    {
      categoryViews: [BIOLOGICAL_SEX, GENUS_SPECIES, DONOR_COUNT],
      label: "Donor",
    },
    {
      categoryViews: [FILE_FORMAT, FILE_TYPE],
      label: "File",
    },
  ],
  onFilter: fn(),
};

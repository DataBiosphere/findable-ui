import { fn } from "@storybook/test";
import { PartialColumn } from "./types";

export const BIONETWORK: PartialColumn = {
  columnDef: { header: "BioNetwork" },
  getCanFilter: () => true,
  getCanGlobalFilter: () => false,
  getFacetedUniqueValues: () =>
    new Map([
      ["Nervous System", 3],
      ["Brain", 2],
      ["Lung", 1],
    ]),
  getFilterValue: () => ["Nervous System", "Brain"],
  id: "bioNetwork",
  setFilterValue: fn(),
};

export const DESCRIPTION: PartialColumn = {
  columnDef: { header: "Description" },
  getCanFilter: () => false,
  getCanGlobalFilter: () => true,
  getFacetedUniqueValues: () =>
    new Map([
      ["Platform used for single cell library construction.", 1],
      ["Platform used for sequencing.", 1],
    ]),
  id: "description",
};

export const EXAMPLE: PartialColumn = {
  columnDef: { header: "Example" },
  getCanFilter: () => false,
  getCanGlobalFilter: () => false,
  getFacetedUniqueValues: () => new Map([["EFO:0008563", 1]]),
  id: "example",
};

export const REQUIRED: PartialColumn = {
  columnDef: { header: "Required" },
  getCanFilter: () => true,
  getCanGlobalFilter: () => false,
  getFacetedUniqueValues: () =>
    new Map([
      ["Required", 16],
      ["Not Required", 30],
    ]),
  id: "required",
};

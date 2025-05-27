import { PartialColumn } from "./types";

export const BIONETWORK: PartialColumn = {
  columnDef: { header: "BioNetwork" },
  getCanFilter: () => true,
  getFacetedUniqueValues: () =>
    new Map([
      ["Lung", 1],
      ["Brain", 2],
    ]),
  id: "bioNetwork",
};

export const EXAMPLE: PartialColumn = {
  columnDef: { header: "Example" },
  getCanFilter: () => false,
  getFacetedUniqueValues: () => new Map([["EFO:0008563", 1]]),
  id: "example",
};

export const REQUIRED: PartialColumn = {
  columnDef: { header: "Required" },
  getCanFilter: () => true,
  getFacetedUniqueValues: () =>
    new Map([
      ["Required", 16],
      ["Not Required", 30],
    ]),
  id: "required",
};

import {
  FacetedOptions,
  getFacetedRowModel,
  RowData,
} from "@tanstack/react-table";
import { getFacetedMinMaxValues } from "./getFacetedMinMaxValues";
import { getFacetedUniqueValues } from "./getFacetedUniqueValues";

export const FACETED_OPTIONS: Pick<
  FacetedOptions<RowData>,
  "getFacetedMinMaxValues" | "getFacetedRowModel" | "getFacetedUniqueValues"
> = {
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
};

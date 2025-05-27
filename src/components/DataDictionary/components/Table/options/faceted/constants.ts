import {
  FacetedOptions,
  getFacetedRowModel,
  RowData,
} from "@tanstack/react-table";
import { getFacetedUniqueValuesWithArrayValues } from "../../../../../Table/common/utils";

export const FACETED_OPTIONS: Pick<
  FacetedOptions<RowData>,
  "getFacetedRowModel" | "getFacetedUniqueValues"
> = {
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValuesWithArrayValues(),
};

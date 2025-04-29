import {
  FacetedOptions,
  getFacetedRowModel,
  RowData,
} from "@tanstack/react-table";
import { getFacetedUniqueValuesWithArrayValues } from "../../../../../components/Table/common/utils";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";

export const FACETED_OPTIONS: Record<EXPLORE_MODE, FacetedOptions<RowData>> = {
  CS_FETCH_CS_FILTERING: {
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValuesWithArrayValues(),
  },
  SS_FETCH_CS_FILTERING: {
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValuesWithArrayValues(),
  },
  SS_FETCH_SS_FILTERING: {
    getFacetedRowModel: undefined,
    getFacetedUniqueValues: undefined,
  },
};

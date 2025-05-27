import {
  ColumnFiltersOptions,
  ColumnFiltersState,
  RowData,
  Updater,
} from "@tanstack/react-table";
import { useCallback } from "react";
import { Attribute } from "../../../../../../common/entities";
import { updateColumnFilters } from "../../../../../../providers/dataDictionary/actions/updateColumnFilters/dispatch";
import { useDataDictionaryState } from "../../../../../../providers/dataDictionary/hooks/useDataDictionaryState";
import { COLUMN_FILTERS_OPTIONS } from "./constants";

export const useColumnFiltersOptions = <
  T extends RowData = Attribute
>(): ColumnFiltersOptions<T> => {
  const { dataDictionaryDispatch } = useDataDictionaryState();

  const onColumnFiltersChange = useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>): void =>
      dataDictionaryDispatch?.(updateColumnFilters({ updaterOrValue })),
    [dataDictionaryDispatch]
  );

  return {
    ...COLUMN_FILTERS_OPTIONS,
    onColumnFiltersChange,
  };
};

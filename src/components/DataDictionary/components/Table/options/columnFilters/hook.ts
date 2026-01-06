import {
  ColumnFiltersOptions,
  ColumnFiltersState,
  RowData,
  Updater,
} from "@tanstack/react-table";
import { useCallback } from "react";
import { Attribute } from "../../../../../../common/entities";
import { useDataDictionary } from "../../../../../../providers/dataDictionary/hook";
import { updateColumnFilters } from "../../../../../../providers/dataDictionaryState/actions/updateColumnFilters/dispatch";
import { useDataDictionaryState } from "../../../../../../providers/dataDictionaryState/hooks/UseDataDictionaryState/hook";
import { COLUMN_FILTERS_OPTIONS } from "./constants";

export const useColumnFiltersOptions = <
  T extends RowData = Attribute,
>(): ColumnFiltersOptions<T> => {
  const { dictionary } = useDataDictionary();
  const { dataDictionaryDispatch } = useDataDictionaryState();

  const onColumnFiltersChange = useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>): void => {
      dataDictionaryDispatch?.(
        updateColumnFilters({ dictionary, updaterOrValue }),
      );
    },
    [dataDictionaryDispatch, dictionary],
  );

  return {
    ...COLUMN_FILTERS_OPTIONS,
    onColumnFiltersChange,
  };
};

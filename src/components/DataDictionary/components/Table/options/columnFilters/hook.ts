import {
  ColumnFiltersOptions,
  ColumnFiltersState,
  RowData,
  Updater,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Attribute } from "../../../../../../common/entities";
import { resolveUpdater } from "../../../../../Table/options/updater";
import { COLUMN_FILTERS_OPTIONS } from "./constants";

export const useColumnFiltersOptions = <T extends RowData = Attribute>({
  setColumnFilters,
}: {
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}): ColumnFiltersOptions<T> => {
  // Column filters change handler.
  // TODO dispatch to provider with reducer.
  const onColumnFiltersChange = useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>): void => {
      setColumnFilters((old) =>
        resolveUpdater<ColumnFiltersState>(updaterOrValue, old)
      );
    },
    [setColumnFilters]
  );

  return {
    ...COLUMN_FILTERS_OPTIONS,
    onColumnFiltersChange,
  };
};

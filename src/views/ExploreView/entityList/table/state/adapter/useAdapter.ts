import { useCallback } from "react";
import { UseAdapter } from "./types";
import { useTables } from "../../../../../../providers/tables/hooks/UseTables/hook";
import { Updater, ColumnFiltersState } from "@tanstack/react-table";
import { updateColumnFilters } from "../../../../../../providers/tables/actions/updateColumnFilters/dispatch";

export const useAdapter = (entityListType: string): UseAdapter => {
  const { dispatch } = useTables();

  const tableKey = entityListType;

  const onColumnFiltersChange = useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      dispatch(updateColumnFilters({ tableKey, updaterOrValue }));
    },
    [dispatch, tableKey],
  );

  return { adapter: { onColumnFiltersChange } };
};

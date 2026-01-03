import { useCallback } from "react";
import { UseAdapter } from "./types";
import { useTables } from "../../../../../../providers/tables/hooks/UseTables/hook";
import {
  Updater,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { updateColumnFilters } from "../../../../../../providers/tables/actions/updateColumnFilters/dispatch";
import { updatePagination } from "../../../../../../providers/tables/actions/updatePagination/dispatch";
import { useRevision } from "../../../../../../providers/revision/hook";

export const useAdapter = (entityListType: string): UseAdapter => {
  const { revision } = useRevision();
  const { dispatch } = useTables();

  const tableKey = entityListType;

  const onColumnFiltersChange = useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      dispatch(updateColumnFilters({ tableKey, updaterOrValue }));
    },
    [dispatch, tableKey],
  );

  const onPaginationChange = useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      dispatch(
        updatePagination({
          revision,
          tableKey,
          updaterOrValue,
        }),
      );
    },
    [dispatch, revision, tableKey],
  );

  return { adapter: { onColumnFiltersChange, onPaginationChange } };
};

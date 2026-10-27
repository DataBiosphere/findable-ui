import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { TableCreator } from "../../../../../../TableCreator/tableCreator";
import { EntityListProps } from "./types";

/**
 * Entity list table view, rendering the table with the entity's list view config. The page scrolls rather than the table.
 * @param props - Component props.
 * @param props.entityListType - Entity list type.
 * @param props.loading - Whether the table is loading.
 * @param props.table - TanStack table instance.
 * @returns The table view, or null when the entity list type is not the explore state's tab value.
 */
export const TableView = <T extends RowData>({
  entityListType,
  loading,
  table,
}: EntityListProps<T>): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { exploreState } = useExploreState();
  const { listView } = entityConfig;

  // required currently for client-side fetching as the pre-rendered page
  // loads with the previous tabs data on the first render after switching tabs. (or similar)
  if (entityListType !== exploreState.tabValue) return null;

  return (
    <TableCreator
      listView={listView}
      loading={loading}
      pageScroll
      table={table}
    />
  );
};

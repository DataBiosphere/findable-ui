import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { TableCreator } from "../../../../../../TableCreator/tableCreator";
import { EntityListProps } from "./types";

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

  return <TableCreator listView={listView} loading={loading} table={table} />;
};

import { RowData } from "@tanstack/react-table";
import React from "react";
import { useConfig } from "../../../../../../hooks/useConfig";
import { useExploreState } from "../../../../../../hooks/useExploreState";
import { Table } from "../../../../../Table/table";
import { EntityListProps } from "./types";

export const EntityList = <T extends RowData>({
  entityListType,
  table,
}: EntityListProps<T>): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { exploreState } = useExploreState();
  const { loading } = exploreState;
  const { listView } = entityConfig;

  // required currently for client-side fetching as the pre-rendered page
  // loads with the previous tabs data on the first render after switching tabs. (or similar)
  if (entityListType !== exploreState.tabValue) return null;

  return <Table listView={listView} loading={loading} table={table} />;
};

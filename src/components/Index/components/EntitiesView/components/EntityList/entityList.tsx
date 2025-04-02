import React from "react";
import { useConfig } from "../../../../../../hooks/useConfig";
import { useExploreState } from "../../../../../../hooks/useExploreState";
import { TableCreator } from "../../../../../TableCreator/tableCreator";
import { EntityListProps } from "./types";

export const EntityList = ({
  entityListType,
}: EntityListProps): JSX.Element | null => {
  const { entityConfig } = useConfig();
  const { exploreState } = useExploreState();
  const { listItems, loading } = exploreState;
  const { getId: getRowId, list, listView } = entityConfig;
  const { columns: columnsConfig } = list;

  // required currently for client-side fetching as the pre-rendered page
  // loads with the previous tabs data on the first render after switching tabs. (or similar)
  if (entityListType !== exploreState.tabValue) return null;

  return (
    <TableCreator
      columns={columnsConfig}
      getRowId={getRowId}
      items={listItems ?? []}
      listView={listView}
      loading={loading}
    />
  );
};

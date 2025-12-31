import { JSX } from "react";
import { DrawerProvider } from "../../components/common/Drawer/provider/provider";
import { ExploreViewProps } from "./types";
import { DataSelector } from "./entityList/data/selector/dataSelector";
import { TableSelector } from "./entityList/table/selector/tableSelector";
import { TableRows } from "../../components/Detail/components/Table/components/TableRows/tableRows";
import { GridTable } from "../../components/Table/table.styles";
import { getColumnTrackSizing } from "../../components/TableCreator/options/columnTrackSizing/utils";
import { TableBody } from "@mui/material";
import { useCatalogBootstrap } from "../../hooks/catalog/UseCatalogBootstrap/useCatalogBootstrap";

/**
 * ExploreView Component
 *
 * Renders the main "Explore" view, which displays a filterable, sortable,
 * and searchable list of entities (e.g., biosamples, datasets).
 *
 * @param props - Page props.
 * @returns ExploreView component.
 */
export const ExploreView = <T = unknown,>(
  props: ExploreViewProps<T>,
): JSX.Element => {
  useCatalogBootstrap();
  const { entityListType } = props;
  return (
    <DataSelector {...props}>
      {({ data }) => (
        <TableSelector data={data} entityListType={entityListType}>
          {({ table }) => {
            return (
              <DrawerProvider>
                <GridTable
                  gridTemplateColumns={getColumnTrackSizing(
                    table.getVisibleFlatColumns(),
                  )}
                >
                  <TableBody>
                    <TableRows tableInstance={table} />
                  </TableBody>
                </GridTable>
              </DrawerProvider>
            );
          }}
        </TableSelector>
      )}
    </DataSelector>
  );
};

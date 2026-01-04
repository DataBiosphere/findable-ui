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
import { useStateUrlSync } from "./hooks/UseStateUrlSync/hook";
import { stateUrlAdapter as adapter } from "./hooks/UseStateUrlSync/adapter/adapter";
import { RevisionProvider } from "../../providers/revision/provider";
import { FilterSelector } from "./entityList/filters/selector/filterSelector";
import { FilterSort } from "../../components/Filter/components/controls/Controls/components/FilterSort/filterSort";
import { Filters } from "../../components/Filter/components/Filters/filters";
import { FilterController } from "./entityList/filters/controller/filterController";

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
  useStateUrlSync(props.entityListType, adapter);
  return (
    <RevisionProvider revisionKey={props.entityListType}>
      <DataSelector {...props}>
        {({ data }) => (
          <TableSelector data={data} entityListType={props.entityListType}>
            {({ table }) => (
              <FilterController table={table}>
                {({ actions, filterSort }) => (
                  <FilterSelector
                    entityListType={props.entityListType}
                    filterSort={filterSort}
                    table={table}
                  >
                    {({ categoryFilters }) => {
                      return (
                        <DrawerProvider>
                          <FilterSort
                            filterSort={filterSort}
                            onFilterSortChange={actions.onFilterSortChange}
                          />
                          <Filters
                            categoryFilters={categoryFilters}
                            onFilter={actions.onFilter.bind(null, false)}
                          />
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
                  </FilterSelector>
                )}
              </FilterController>
            )}
          </TableSelector>
        )}
      </DataSelector>
    </RevisionProvider>
  );
};

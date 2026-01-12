import { Fragment, JSX } from "react";
import { useTableFilters } from "../../../../../common/tables/hooks/UseTableFilters/hook";
import { useUpdateFilterSort } from "../../../hooks/UseUpdateFilterSort/hook";
import { useEntityViewDispatch } from "../../../state/hooks/useEntityViewDispatch/hook";
import { useFilters } from "../hooks/UseFilters/hook";
import { FilterControllerProps } from "./types";

/**
 * Controller component that orchestrates filter-related hooks.
 * Provides filter actions and state to children via render props.
 * @param props - Component props.
 * @param props.children - Render prop receiving filter actions and state.
 * @param props.entityListType - Entity identifier.
 * @param props.getPresetTableState - Function to get table state for a preset key.
 * @param props.table - Table instance.
 * @returns Fragment with rendered children.
 */
export const FilterController = <T = unknown,>({
  children,
  entityListType,
  getPresetTableState,
  table,
}: FilterControllerProps<T>): JSX.Element => {
  const { onClearPreset } = useEntityViewDispatch(entityListType);
  const { onFilterChange, onFilterReset } = useTableFilters(
    table,
    entityListType,
    { getPresetTableState, onClearPreset },
  );
  const { onFilter } = useFilters(onFilterChange);
  const { filterSort, onFilterSortChange } = useUpdateFilterSort();
  return (
    <Fragment>
      {children({
        actions: { onFilter, onFilterReset, onFilterSortChange },
        filterSort,
      })}
    </Fragment>
  );
};

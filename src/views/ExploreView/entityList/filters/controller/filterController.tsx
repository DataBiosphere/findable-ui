import { Fragment, JSX } from "react";
import { FilterControllerProps } from "./types";
import { useTableFilters } from "../../../../../common/tables/hooks/UseTableFilters/hook";
import { useUpdateFilterSort } from "../../../hooks/UseUpdateFilterSort/hook";
import { useFilters } from "../hooks/UseFilters/hook";
import { useEntityViewDispatch } from "../../../state/hooks/useEntityViewDispatch/hook";

/**
 * Controller component that orchestrates filter-related hooks.
 * Provides filter actions and state to children via render props.
 *
 * @param props - Component props.
 * @param props.children - Render prop receiving filter actions and state.
 * @param props.entityListType - Entity identifier.
 * @param props.table - Table instance.
 *
 * @returns Fragment with rendered children.
 */
export const FilterController = <T = unknown,>({
  children,
  entityListType,
  table,
}: FilterControllerProps<T>): JSX.Element => {
  const { onClearPreset } = useEntityViewDispatch(entityListType);
  const { onFilterChange, onFilterReset } = useTableFilters(table, {
    onClearPreset,
  });
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

import { Fragment, JSX } from "react";
import { FilterControllerProps } from "./types";
import { useTableFilters } from "../../../../../common/tables/hooks/UseTableFilters/hook";
import { useUpdateFilterSort } from "../../../hooks/UseUpdateFilterSort/hook";
import { useFilters } from "../hooks/UseFilters/hook";

export const FilterController = <T = unknown,>({
  children,
  table,
}: FilterControllerProps<T>): JSX.Element => {
  const { onFilterChange, onFilterReset } = useTableFilters(table);
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

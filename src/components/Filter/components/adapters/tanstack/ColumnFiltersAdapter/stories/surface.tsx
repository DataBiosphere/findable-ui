import { Box } from "@mui/material";
import { JSX } from "react";
import { Controls } from "../../../../controls/Controls/controls";
import { Filters } from "../../../../Filters/filters";
import type { SurfaceProps } from "../../../../surfaces/types";

/**
 * Minimal story filter surface: the filter controls above the filters.
 * @param props - Surface props.
 * @param props.categoryFilters - Category filters.
 * @param props.filterSort - Current filter sort.
 * @param props.filterSortEnabled - Whether the filter sort control is shown.
 * @param props.onFilter - Function invoked when a filter value is toggled or all filters are cleared.
 * @param props.onFilterSortChange - Function invoked with the selected filter sort.
 * @returns Filter surface.
 */
export const Surface = ({
  categoryFilters,
  filterSort,
  filterSortEnabled,
  onFilter,
  onFilterSortChange,
}: SurfaceProps): JSX.Element => {
  return (
    <Box sx={{ display: "grid", gap: 2, width: 320 }}>
      <Controls
        filterSort={filterSort}
        filterSortEnabled={filterSortEnabled}
        onFilter={onFilter}
        onFilterSortChange={onFilterSortChange}
      />
      <Filters categoryFilters={categoryFilters} onFilter={onFilter} />
    </Box>
  );
};

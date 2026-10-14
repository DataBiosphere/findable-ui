import { Button as MButton, Typography } from "@mui/material";
import { JSX } from "react";
import { CLEAR_ALL } from "../../../../../common/entities";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { BUTTON_PROPS } from "../../../../common/Button/constants";
import { FilterSort } from "./components/FilterSort/filterSort";
import { StyledGrid } from "./controls.styles";
import { ControlsProps } from "./types";

/**
 * Filter controls: the "Filters" title, a "Clear All" button that clears all filters, and the filter sort control.
 * @param props - Component props.
 * @param props.className - Class name applied to the controls grid.
 * @param props.filterSort - Current filter sort.
 * @param props.filterSortEnabled - Whether the filter sort control is shown, which also needs onFilterSortChange; defaults to false.
 * @param props.onFilter - Function invoked to clear all filters.
 * @param props.onFilterSortChange - Function invoked with the selected filter sort.
 * @returns The filter controls.
 */
export const Controls = ({
  className,
  filterSort,
  filterSortEnabled = false,
  onFilter,
  onFilterSortChange,
}: ControlsProps): JSX.Element | null => {
  return (
    <StyledGrid className={className} container>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}>
        Filters
      </Typography>
      <MButton
        {...BUTTON_PROPS.PRIMARY_TEXT}
        onClick={() => onFilter(CLEAR_ALL, undefined, false)}
      >
        Clear All
      </MButton>
      <FilterSort
        enabled={filterSortEnabled}
        filterSort={filterSort}
        onFilterSortChange={onFilterSortChange}
      />
    </StyledGrid>
  );
};

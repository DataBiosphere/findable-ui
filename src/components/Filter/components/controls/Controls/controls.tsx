import { Button as MButton, Typography } from "@mui/material";
import React from "react";
import { CLEAR_ALL } from "../../../../../common/entities";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { BUTTON_PROPS } from "../../../../common/Button/constants";
import { FilterSort } from "./components/FilterSort/filterSort";
import { StyledGrid } from "./controls.styles";
import { ControlsProps } from "./types";

/**
 * Renders filter controls including title, clear all button, and optional sort functionality.
 * @param props - Component props.
 * @param props.className - Optional CSS class name.
 * @param props.filterSort - Filter sort configuration.
 * @param props.filterSortEnabled - Whether filter sorting is enabled.
 * @param props.onFilter - Callback when filters are cleared.
 * @param props.onFilterSortChange - Callback when filter sort changes.
 * @returns Filter controls or null if not applicable.
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

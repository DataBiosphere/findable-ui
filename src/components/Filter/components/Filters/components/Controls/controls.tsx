import React from "react";
import { STACK_PROPS } from "../../../../../../styles/common/mui/stack";
import { Button } from "../../../controls/Controls/components/FilterSort/components/Button/button";
import { FilterSort } from "../../../controls/Controls/components/FilterSort/filterSort";
import { StyledStack } from "./controls.styles";
import type { ControlsProps } from "./types";

/**
 * Renders filter controls with optional sort functionality.
 * Displays category label alongside a sort button when sorting is enabled.
 * @param props - Component props.
 * @param props.children - Child elements to render within the controls.
 * @param props.filterSort - Filter sort configuration.
 * @param props.filterSortEnabled - Whether filter sorting is enabled.
 * @param props.onFilterSortChange - Callback when filter sort changes.
 * @returns Filter controls with category label and optional sort button.
 */
export const Controls = ({
  children,
  filterSort,
  filterSortEnabled,
  onFilterSortChange,
}: ControlsProps): JSX.Element => {
  return (
    <StyledStack direction={STACK_PROPS.DIRECTION.ROW} useFlexGap>
      {children}
      <FilterSort
        Button={Button}
        enabled={filterSortEnabled}
        filterSort={filterSort}
        onFilterSortChange={onFilterSortChange}
      />
    </StyledStack>
  );
};

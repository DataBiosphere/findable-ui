import { Button as MButton, Typography } from "@mui/material";
import { JSX } from "react";
import { CLEAR_ALL } from "../../../../../common/entities";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { BUTTON_PROPS } from "../../../../common/Button/constants";
import { FilterSort } from "./components/FilterSort/filterSort";
import { StyledGrid } from "./controls.styles";
import { ControlsProps } from "./types";

/**
 * Renders filter title and "Clear All" button.
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

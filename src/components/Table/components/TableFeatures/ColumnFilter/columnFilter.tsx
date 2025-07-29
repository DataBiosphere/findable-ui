import { Grid, Typography } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React, { Fragment, useCallback } from "react";
import { SVG_ICON_PROPS } from "../../../../../styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { DropDownIcon } from "../../../../common/Form/components/Select/components/DropDownIcon/dropDownIcon";
import { useMenu } from "../../../../common/Menu/hooks/useMenu";
import { FilterCountChip } from "../../../../Filter/components/FilterCountChip/filterCountChip";
import { ListItemButton } from "../../../../Filter/components/views/select/components/ListItemButton/listItemButton";
import { SelectListItem } from "../../../../Filter/components/views/select/SelectListItem/selectListItem";
import { getColumnHeader } from "../../../common/utils";
import { getSortedFacetedValues } from "../../../featureOptions/facetedColumn/utils";
import { StyledButton, StyledMenu } from "./columnFilter.styles";
import { GRID_PROPS, MENU_PROPS } from "./constants";
import { ColumnFilterProps } from "./types";
import { updater } from "./utils";

/**
 *  Column filter component with supported filter functions:
 *  - `arrIncludesSome`
 */

export const ColumnFilter = <T extends RowData>({
  Button = StyledButton,
  className,
  column,
  ...props /* MuiMenuProps */
}: ColumnFilterProps<T>): JSX.Element => {
  const { anchorEl, onClose, onOpen, open } = useMenu();

  // Grab the unique values for the column.
  const facetedUniqueValues = column.getFacetedUniqueValues();

  // Sort the values.
  const sortedValues = getSortedFacetedValues(facetedUniqueValues);

  // Get the filter values.
  const filterValue = (column.getFilterValue() || []) as unknown[];

  const onFilter = useCallback(
    (value: unknown) => {
      column.setFilterValue(updater(value));
    },
    [column]
  );

  return (
    <Fragment>
      <Button
        key={column.id}
        disabled={sortedValues.length === 0}
        endIcon={<DropDownIcon color={SVG_ICON_PROPS.COLOR.INK_LIGHT} />}
        onClick={onOpen}
        open={open}
      >
        <Grid {...GRID_PROPS}>
          {getColumnHeader(column)}
          <FilterCountChip count={filterValue.length} />
        </Grid>
      </Button>
      <StyledMenu
        {...MENU_PROPS}
        {...props}
        className={className}
        anchorEl={anchorEl}
        onClose={onClose}
        open={open}
      >
        {sortedValues.map(([value, occurrence]) => {
          const checked = filterValue.includes(value);
          const onClick = (): void => onFilter(value);
          const primary = String(value);
          const secondary = String(occurrence);
          const selected = checked;
          return (
            <SelectListItem
              key={primary}
              slotProps={{
                checkbox: { checked },
                listItemButton: { onClick, selected },
                listItemText: { primary, secondary },
              }}
            />
          );
        })}
        <ListItemButton
          disabled={!column.getIsFiltered()}
          onClick={() => column.setFilterValue(undefined)}
        >
          <Typography
            color={
              column.getIsFiltered()
                ? TYPOGRAPHY_PROPS.COLOR.PRIMARY
                : TYPOGRAPHY_PROPS.COLOR.INHERIT
            }
            variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_500}
          >
            Clear All
          </Typography>
        </ListItemButton>
      </StyledMenu>
    </Fragment>
  );
};

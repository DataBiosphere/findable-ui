import { Grid, Typography } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { Fragment, JSX, useCallback } from "react";
import { useCloseOnEscape } from "../../../../../hooks/UseCloseOnEscape/hook";
import { BUTTON_PROPS } from "../../../../../styles/common/mui/button";
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
import { useScrollWithPage } from "./hooks/UseScrollWithPage/hook";
import { ColumnFilterProps } from "./types";
import { updater } from "./utils";

/**
 * Column filter, a button labelled with the column header and its selected filter value count, opening a menu of the column's faceted values with their counts and a "Clear All" item.
 * Selecting a value adds it to the column's filter value, or removes it if already selected. Supports the `arrIncludesSome` filter function.
 * The button is disabled when the column has no faceted values.
 * The page scrolls while the menu is open: the menu moves with its button, and closes at once when the button reaches the header or leaves the window. Escape or a click outside closes it and returns focus to the button.
 * @param props - Component props.
 * @param props.Button - Button component opening the menu; defaults to the styled column filter button.
 * @param props.className - Class name applied to the menu.
 * @param props.column - TanStack column.
 * @param props.MenuListProps - Deprecated Mui menu list props, merged into the menu's slot props.
 * @param props.PaperProps - Deprecated Mui paper props, merged into the menu's slot props.
 * @param props.slotProps - Mui menu slot props, merged with the default column filter menu slot props.
 * @param props.TransitionProps - Deprecated Mui transition props, merged into the menu's slot props.
 * @returns The column filter button and menu.
 */
export const ColumnFilter = <T extends RowData>({
  Button = StyledButton,
  className,
  column,
  MenuListProps,
  PaperProps,
  slotProps,
  TransitionProps,
  ...props /* MuiMenuProps */
}: ColumnFilterProps<T>): JSX.Element => {
  // Grab the unique values for the column.
  const facetedUniqueValues = column.getFacetedUniqueValues();

  // Sort the values.
  const sortedValues = getSortedFacetedValues(facetedUniqueValues);

  // Get the filter values.
  const filterValue = (column.getFilterValue() || []) as unknown[];

  // With no values to filter by, the trigger is disabled and cannot open.
  const disabled = sortedValues.length === 0;

  const { anchorEl, getSlotProps, onClose, onOpen, open, triggerProps } =
    useMenu({ disabled });

  const {
    closeProps,
    menuAnchorEl,
    onClose: onMenuClose,
  } = useScrollWithPage({
    anchorEl,
    onClose,
    open,
  });

  // The menu opens without taking focus, so MUI's own Escape handling, bound inside the menu, would not see the key.
  useCloseOnEscape({ onClose: onMenuClose, open });

  const onFilter = useCallback(
    (value: unknown) => {
      column.setFilterValue(updater(value));
    },
    [column],
  );

  return (
    <Fragment>
      <Button
        {...triggerProps}
        disabled={disabled}
        endIcon={<DropDownIcon color={SVG_ICON_PROPS.COLOR.INK_LIGHT} />}
        onClick={onOpen}
        open={open}
        size={BUTTON_PROPS.SIZE.LARGE}
      >
        <Grid {...GRID_PROPS}>
          {getColumnHeader(column)}
          <FilterCountChip count={filterValue.length} />
        </Grid>
      </Button>
      <StyledMenu
        {...MENU_PROPS}
        {...props}
        {...closeProps}
        className={className}
        anchorEl={menuAnchorEl}
        onClose={onMenuClose}
        open={open}
        slotProps={getSlotProps(MENU_PROPS.slotProps, {
          MenuListProps,
          PaperProps,
          TransitionProps,
          slotProps,
        })}
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
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}
          >
            Clear All
          </Typography>
        </ListItemButton>
      </StyledMenu>
    </Fragment>
  );
};

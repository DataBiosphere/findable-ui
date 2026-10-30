import { Grid, Paper } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { Fragment, JSX, useId } from "react";
import { BUTTON_PROPS } from "../../../../../styles/common/mui/button";
import { PAPER_PROPS } from "../../../../../styles/common/mui/paper";
import { SVG_ICON_PROPS } from "../../../../../styles/common/mui/svgIcon";
import { getPopupAriaProps, HAS_POPUP } from "../../../../../utils/ariaPopup";
import { DropDownIcon } from "../../../../common/Form/components/Select/components/DropDownIcon/dropDownIcon";
import { PopperProvider } from "../../../../common/Popper/provider/provider";
import { withHeaderPadding } from "../../../../Filter/common/popper";
import { ClickAway } from "../../../../Filter/components/Filter/components/ClickAway/clickAway";
import { MenuTransition } from "../../../../Filter/components/Filter/components/MenuTransition/menuTransition";
import { FilterCountChip } from "../../../../Filter/components/FilterCountChip/filterCountChip";
import { getColumnHeader } from "../../../common/utils";
import { getSortedFacetedValues } from "../../../featureOptions/facetedColumn/utils";
import { StyledButton, StyledPopper } from "./columnFilter.styles";
import { ColumnFilterList } from "./components/ColumnFilterList/columnFilterList";
import {
  COLUMN_FILTER_PLACEMENT,
  GRID_PROPS,
  POPPER_OPTIONS,
  POPPER_PROPS,
} from "./constants";
import { ColumnFilterProps } from "./types";
import { closeAndRestoreFocus } from "./utils";

/**
 * Column filter, a button labelled with the column header and its selected filter value count, opening a panel of the column's faceted values with their counts and a "Clear All" item.
 * Selecting a value adds it to the column's filter value, or removes it if already selected. Supports the `arrIncludesSome` filter function.
 * The button is disabled when the column has no faceted values, and toggles the panel otherwise.
 * The panel is a non-modal dialog, as the sidebar category filter's: the page scrolls beneath it, and it follows its button, flipping above it when there is no room below and staying clear of the header. It hides while the button is out of view, e.g. passed under the header, and shows again when it returns. A click away (which still reaches what it lands on) closes it, as does Escape, which returns focus to the button.
 * @param props - Component props.
 * @param props.Button - Button component opening the panel; defaults to the styled column filter button.
 * @param props.className - Class name applied to the panel.
 * @param props.column - TanStack column.
 * @param props.placement - Edge of the button the panel lines up with; defaults to its end.
 * @returns The column filter button and panel.
 */
export const ColumnFilter = <T extends RowData>({
  Button = StyledButton,
  className,
  column,
  placement = COLUMN_FILTER_PLACEMENT.BOTTOM_END,
}: ColumnFilterProps<T>): JSX.Element => {
  // Grab the unique values for the column.
  const facetedUniqueValues = column.getFacetedUniqueValues();

  // Sort the values.
  const sortedValues = getSortedFacetedValues(facetedUniqueValues);

  // Get the filter values.
  const filterValue = (column.getFilterValue() || []) as unknown[];

  // With no values to filter by, the trigger is disabled and cannot open.
  const disabled = sortedValues.length === 0;

  const header = getColumnHeader(column);
  const panelId = useId();

  return (
    <PopperProvider>
      {({ anchorEl, onClose, onOpen, open }): JSX.Element => (
        <Fragment>
          <Button
            {...getPopupAriaProps({
              disabled,
              hasPopup: HAS_POPUP.DIALOG,
              id: panelId,
              open,
            })}
            disabled={disabled}
            endIcon={<DropDownIcon color={SVG_ICON_PROPS.COLOR.INK_LIGHT} />}
            onClick={(e) => (open ? onClose() : onOpen(e))}
            open={open}
            size={BUTTON_PROPS.SIZE.LARGE}
          >
            <Grid {...GRID_PROPS}>
              {header}
              <FilterCountChip count={filterValue.length} />
            </Grid>
          </Button>
          <StyledPopper
            {...POPPER_PROPS}
            anchorEl={anchorEl}
            aria-label={header}
            className={className}
            id={panelId}
            open={open}
            placement={placement}
            popperOptions={
              open ? withHeaderPadding(POPPER_OPTIONS[placement]) : undefined
            }
            // Popper defaults its root to role="tooltip"; the button declares
            // aria-haspopup="dialog", and this is a non-modal dialog.
            role="dialog"
          >
            {({ placement, TransitionProps }): JSX.Element => (
              <ClickAway
                anchorEl={anchorEl}
                onClose={onClose}
                onEscape={() => closeAndRestoreFocus(onClose, anchorEl)}
                open={open}
              >
                <MenuTransition {...TransitionProps} placement={placement}>
                  <Paper variant={PAPER_PROPS.VARIANT.MENU}>
                    <ColumnFilterList
                      column={column}
                      filterValue={filterValue}
                      sortedValues={sortedValues}
                    />
                  </Paper>
                </MenuTransition>
              </ClickAway>
            )}
          </StyledPopper>
        </Fragment>
      )}
    </PopperProvider>
  );
};

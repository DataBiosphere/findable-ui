import {
  Checkbox,
  ListItemButton,
  ListItemText,
  Button as MButton,
  Typography,
} from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { SVG_ICON_PROPS } from "../../../../../styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { CheckedIcon } from "../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { DropDownIcon } from "../../../../common/Form/components/Select/components/DropDownIcon/dropDownIcon";
import { useMenu } from "../../../../common/Menu/hooks/useMenu";
import { getColumnHeader } from "../../../common/utils";
import { getSortedFacetedValues } from "../../../featureOptions/facetedColumn/utils";
import { StyledMenu } from "./columnFilter.styles";
import { MENU_PROPS } from "./constants";
import { ColumnFilterProps } from "./types";
import { updater } from "./utils";

/**
 *  Column filter component with supported filter functions:
 *  - `arrIncludesSome`
 */

export const ColumnFilter = <T extends RowData>({
  Button = MButton,
  className,
  column,
  ...props /* MuiMenuProps */
}: ColumnFilterProps<T>): JSX.Element => {
  const { anchorEl, onClose, onOpen, open } = useMenu();
  const facetedUniqueValues = column.getFacetedUniqueValues();
  const sortedValues = getSortedFacetedValues(facetedUniqueValues);
  const filterValue = (column.getFilterValue() || []) as unknown[];
  return (
    <Fragment>
      <Button
        key={column.id}
        endIcon={<DropDownIcon color={SVG_ICON_PROPS.COLOR.INK_LIGHT} />}
        onClick={onOpen}
      >
        {getColumnHeader(column)}
      </Button>
      <StyledMenu
        {...MENU_PROPS}
        {...props}
        className={className}
        anchorEl={anchorEl}
        onClose={onClose}
        open={open}
      >
        {sortedValues.map(([value, occurrence]) => (
          <ListItemButton
            key={String(value)}
            onClick={() => column.setFilterValue(updater(value))}
          >
            <Checkbox
              checked={filterValue.includes(value)}
              checkedIcon={<CheckedIcon />}
              icon={<UncheckedIcon />}
            />
            <ListItemText
              disableTypography
              primary={<span>{String(value)}</span>}
              secondary={
                <Typography
                  color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
                  variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_400}
                >
                  {occurrence}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
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

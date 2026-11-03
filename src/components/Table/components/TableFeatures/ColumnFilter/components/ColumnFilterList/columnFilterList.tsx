import { List, Typography } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import { ListItemButton } from "../../../../../../Filter/components/views/select/components/ListItemButton/listItemButton";
import { SelectListItem } from "../../../../../../Filter/components/views/select/SelectListItem/selectListItem";
import { updater } from "../../utils";
import { useFocusFirstItem } from "./hooks/UseFocusFirstItem/hook";
import type { ColumnFilterListProps } from "./types";

/**
 * Column filter panel list: the column's faceted values with their counts, each toggling the value in the column's filter, and a "Clear All" item.
 * Focus moves to its first item when it opens.
 * @param props - Component props.
 * @param props.column - TanStack column.
 * @param props.filterValue - The column's selected filter values.
 * @param props.sortedValues - The column's faceted values with their counts, sorted.
 * @returns The column filter panel list.
 */
export const ColumnFilterList = <T extends RowData>({
  column,
  filterValue,
  sortedValues,
}: ColumnFilterListProps<T>): JSX.Element => {
  const listRef = useFocusFirstItem();
  return (
    // A div, not a ul: its items are buttons, not list items.
    <List component="div" ref={listRef}>
      {sortedValues.map(([value, occurrence]) => {
        const checked = filterValue.includes(value);
        const onClick = (): void => column.setFilterValue(updater(value));
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
    </List>
  );
};

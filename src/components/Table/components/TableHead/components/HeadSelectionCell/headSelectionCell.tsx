import { Checkbox } from "@mui/material";
import { HeaderContext, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { IndeterminateIcon } from "../../../../../common/CustomIcon/components/IndeterminateIcon/indeterminateIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

/**
 * Header checkbox that is checked when all rows on the page are selected and indeterminate when some are.
 * Changing it toggles the selection of all rows in the table.
 * @param props - Component props, the TanStack header context.
 * @param props.table - TanStack table instance.
 * @returns The header selection checkbox.
 */
export const HeadSelectionCell = <T extends RowData, TValue = unknown>({
  table,
}: HeaderContext<T, TValue>): JSX.Element => {
  const {
    getIsAllPageRowsSelected,
    getIsSomePageRowsSelected,
    getToggleAllRowsSelectedHandler,
  } = table;
  return (
    <Checkbox
      checked={getIsAllPageRowsSelected()}
      checkedIcon={<CheckedIcon />}
      icon={<UncheckedIcon />}
      indeterminate={getIsSomePageRowsSelected()}
      indeterminateIcon={<IndeterminateIcon />}
      onChange={getToggleAllRowsSelectedHandler()}
    />
  );
};

import { Checkbox } from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import React from "react";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { IndeterminateIcon } from "../../../../../common/CustomIcon/components/IndeterminateIcon/indeterminateIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

export interface HeadSelectionCellProps<T extends RowData> {
  tableInstance: Table<T>;
}

export const HeadSelectionCell = <T extends RowData>({
  tableInstance,
}: HeadSelectionCellProps<T>): JSX.Element => {
  const {
    getIsAllPageRowsSelected,
    getIsSomePageRowsSelected,
    getToggleAllRowsSelectedHandler,
  } = tableInstance;
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

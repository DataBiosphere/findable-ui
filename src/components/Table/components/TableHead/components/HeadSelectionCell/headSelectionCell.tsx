import { Checkbox } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { RowData } from "@tanstack/table-core";
import React from "react";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { IndeterminateIcon } from "../../../../../common/CustomIcon/components/IndeterminateIcon/indeterminateIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

export interface HeadSelectionCellProps<T> {
  tableInstance: Table<T>;
}

export const HeadSelectionCell = <T extends RowData>({
  tableInstance,
}: HeadSelectionCellProps<T>): JSX.Element => {
  const {
    getIsAllRowsSelected,
    getIsSomeRowsSelected,
    getToggleAllRowsSelectedHandler,
  } = tableInstance;
  return (
    <Checkbox
      checked={getIsAllRowsSelected()}
      checkedIcon={<CheckedIcon />}
      icon={<UncheckedIcon />}
      indeterminate={getIsSomeRowsSelected()}
      indeterminateIcon={<IndeterminateIcon />}
      onChange={getToggleAllRowsSelectedHandler()}
    />
  );
};

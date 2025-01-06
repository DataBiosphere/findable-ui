import { Checkbox } from "@mui/material";
import { HeaderContext, RowData } from "@tanstack/react-table";
import React from "react";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { IndeterminateIcon } from "../../../../../common/CustomIcon/components/IndeterminateIcon/indeterminateIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

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

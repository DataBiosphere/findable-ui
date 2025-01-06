import { Checkbox as MCheckbox } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import React from "react";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

export const RowSelectionCell = <T extends RowData, TValue = unknown>({
  row,
}: CellContext<T, TValue>): JSX.Element => {
  const { getIsSelected, getToggleSelectedHandler } = row;
  return (
    <MCheckbox
      checked={getIsSelected()}
      checkedIcon={<CheckedIcon />}
      icon={<UncheckedIcon />}
      onChange={getToggleSelectedHandler()}
    />
  );
};

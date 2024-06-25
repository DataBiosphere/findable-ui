import { Checkbox as MCheckbox } from "@mui/material";
import { Row, RowData } from "@tanstack/react-table";
import React from "react";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

export interface RowSelectionCellProps<T extends RowData> {
  row: Row<T>;
}

export const RowSelectionCell = <T extends RowData>({
  row,
}: RowSelectionCellProps<T>): JSX.Element => {
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

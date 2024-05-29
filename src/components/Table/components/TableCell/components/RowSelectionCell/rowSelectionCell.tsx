import { Checkbox as MCheckbox } from "@mui/material";
import { Row } from "@tanstack/react-table";
import { RowData } from "@tanstack/table-core";
import React from "react";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

export interface RowSelectionCellProps<T> {
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

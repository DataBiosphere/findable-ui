import { Checkbox as MCheckbox, Tooltip } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import React from "react";
import { CheckedIcon } from "../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedDisabledIcon } from "../../../../../common/CustomIcon/components/UncheckedDisabledIcon/uncheckedDisabledIcon";
import { UncheckedIcon } from "../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { TOOLTIP_PROPS } from "./constants";

export const RowSelectionCell = <T extends RowData, TValue = unknown>({
  row,
}: CellContext<T, TValue>): JSX.Element => {
  const {
    getCanSelect,
    getIsSelected,
    getSelectionValidation,
    getToggleSelectedHandler,
  } = row;
  return (
    <Tooltip {...TOOLTIP_PROPS} title={getSelectionValidation()}>
      <span>
        <MCheckbox
          checked={getIsSelected()}
          checkedIcon={<CheckedIcon />}
          disabled={!getCanSelect()}
          icon={getCanSelect() ? <UncheckedIcon /> : <UncheckedDisabledIcon />}
          /*
           * Prevents click events from bubbling up to parent components
           * (such as CardActionArea or Accordion) when the checkbox is activated.
           */
          onClick={(e) => e.stopPropagation()}
          onChange={getToggleSelectedHandler()}
        />
      </span>
    </Tooltip>
  );
};

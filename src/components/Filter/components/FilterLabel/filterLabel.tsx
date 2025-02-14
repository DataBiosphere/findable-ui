import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React, { MouseEvent } from "react";
import { DataDictionaryAnnotation } from "../../../../common/entities";
import { Tooltip } from "../../../DataDictionary/components/Tooltip/tooltip";
import { FilterLabel as Label } from "./filterLabel.styles";

export interface FilterLabelProps {
  annotation?: DataDictionaryAnnotation;
  count?: number;
  disabled?: boolean;
  isOpen: boolean;
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const FilterLabel = ({
  annotation,
  count,
  disabled = false,
  isOpen,
  label,
  onClick,
}: FilterLabelProps): JSX.Element => {
  const filterLabel = count ? `${label}\xa0(${count})` : label; // When the count is present, a non-breaking space is used to prevent it from being on its own line
  return (
    <Tooltip description={annotation?.description} title={annotation?.label}>
      <Label
        color="inherit"
        disabled={disabled}
        endIcon={<ArrowDropDownRoundedIcon fontSize="small" />}
        fullWidth
        isOpen={isOpen}
        onClick={onClick}
      >
        {filterLabel}
      </Label>
    </Tooltip>
  );
};

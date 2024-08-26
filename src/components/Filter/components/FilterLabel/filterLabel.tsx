import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React, { MouseEvent } from "react";
import { FilterLabel as Label } from "./filterLabel.styles";

export interface FilterLabelProps {
  count?: number;
  disabled?: boolean;
  isOpen: boolean;
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const FilterLabel = ({
  count,
  disabled = false,
  isOpen,
  label,
  onClick,
}: FilterLabelProps): JSX.Element => {
  const filterLabel = count ? `${label}\xa0(${count})` : label; // When the count is present, a non-breaking space is used to prevent it from being on its own line
  return (
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
  );
};

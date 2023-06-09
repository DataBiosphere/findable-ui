import { CloseRounded } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import { SupersededTag } from "./filterTag.styles";

export interface FilterTagProps {
  label: string;
  onRemove: () => void;
  superseded: boolean;
}

export const FilterTag = ({
  label,
  onRemove,
  superseded,
}: FilterTagProps): JSX.Element => {
  const Tag = superseded ? SupersededTag : Chip;
  return (
    <Tag
      clickable={false} // removes unwanted active and hover ui; "pointer" cursor added to "filterTag" variant in theme.
      color="primary"
      deleteIcon={<CloseRounded color="inherit" />}
      label={label}
      onClick={onRemove}
      onDelete={onRemove}
      variant="filterTag"
    />
  );
};

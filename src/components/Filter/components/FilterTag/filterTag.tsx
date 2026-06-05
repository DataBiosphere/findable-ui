import { CloseRounded } from "@mui/icons-material";
import { Chip, Tooltip } from "@mui/material";
import { JSX } from "react";
import { useTooltipTitle } from "./hooks/UseTooltipTitle/hook";

export interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

const DEFAULT_SLOT_PROPS = {
  popper: {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -6],
        },
      },
      {
        name: "preventOverflow",
        options: { padding: 8 },
      },
    ],
  },
};

export const FilterTag = ({ label, onRemove }: FilterTagProps): JSX.Element => {
  const { ref, title } = useTooltipTitle(label);

  return (
    <Tooltip
      arrow
      disableInteractive
      slotProps={DEFAULT_SLOT_PROPS}
      title={title}
    >
      <Chip
        clickable={false} // removes unwanted active and hover ui; "pointer" cursor added to "filterTag" variant in theme.
        color="primary"
        deleteIcon={<CloseRounded color="inherit" />}
        label={label}
        onClick={onRemove}
        onDelete={onRemove}
        ref={ref}
        variant="filterTag"
      />
    </Tooltip>
  );
};

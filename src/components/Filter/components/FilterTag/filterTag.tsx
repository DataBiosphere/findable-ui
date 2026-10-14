import { CloseRounded } from "@mui/icons-material";
import { Chip, Tooltip } from "@mui/material";
import { JSX } from "react";
import { useTooltipTitle } from "./hooks/UseTooltipTitle/hook";

/**
 * Props for the FilterTag component.
 */
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

/**
 * Filter tag chip that removes its filter when clicked or deleted, with a tooltip of the full label when the label is truncated.
 * @param props - Component props.
 * @param props.label - Tag label.
 * @param props.onRemove - Function invoked to remove the filter.
 * @returns The filter tag.
 */
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

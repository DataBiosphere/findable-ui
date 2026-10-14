import { ChipProps } from "@mui/material";
import { BaseComponentProps } from "../../../types";

/**
 * Props for the FilterCountChip component.
 */
export interface FilterCountChipProps extends BaseComponentProps, ChipProps {
  count?: number | string;
}

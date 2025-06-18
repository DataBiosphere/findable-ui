import { ChipProps } from "@mui/material";
import { BaseComponentProps } from "../../../types";

export interface FilterCountChipProps extends BaseComponentProps, ChipProps {
  count?: number | string;
}

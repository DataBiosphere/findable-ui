import { ButtonProps as MButtonProps } from "@mui/material";
import type { BaseComponentProps } from "../../../../../../types";
import type { FilterCountChipProps } from "../../../../FilterCountChip/types";

export type ButtonProps = BaseComponentProps &
  MButtonProps &
  Pick<FilterCountChipProps, "count">;

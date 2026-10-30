import { Column, RowData } from "@tanstack/react-table";
import { BaseComponentProps } from "../../../../types";
import { StyledButton } from "./columnFilter.styles";
import { COLUMN_FILTER_PLACEMENT } from "./constants";

export type ColumnFilterPlacement =
  (typeof COLUMN_FILTER_PLACEMENT)[keyof typeof COLUMN_FILTER_PLACEMENT];

/**
 * Props for the ColumnFilter component.
 */
export interface ColumnFilterProps<
  T extends RowData,
> extends BaseComponentProps {
  Button?: typeof StyledButton;
  column: Column<T>;
  /** Edge of the button the panel lines up with; defaults to its end. */
  placement?: ColumnFilterPlacement;
}

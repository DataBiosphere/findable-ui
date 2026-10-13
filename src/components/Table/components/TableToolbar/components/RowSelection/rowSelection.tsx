import { Typography } from "@mui/material";
import { Row, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { ComponentsConfig } from "../../../../../../config/entities";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";
import { RowSelection as RowSelectionActions } from "./rowSelection.styles";

/**
 * Props for the RowSelection component.
 */
export interface RowSelectionProps<T extends RowData> {
  className?: string;
  rows: Row<T>[];
  rowSelectionView?: ComponentsConfig;
}

/**
 * Row selection actions, reading "N items selected:" followed by the row selection view's components built from the selected rows.
 * @param props - Component props.
 * @param props.className - Class name applied to the row selection actions.
 * @param props.rows - Selected rows.
 * @param props.rowSelectionView - Row selection view components config; when not given, only the count shows.
 * @returns The row selection actions.
 */
export const RowSelection = <T extends RowData>({
  className,
  rows,
  rowSelectionView,
}: RowSelectionProps<T>): JSX.Element | null => {
  return (
    <RowSelectionActions className={className}>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
        {rows.length} items selected:
      </Typography>
      {rowSelectionView ? (
        <ComponentCreator components={rowSelectionView} response={rows} />
      ) : null}
    </RowSelectionActions>
  );
};

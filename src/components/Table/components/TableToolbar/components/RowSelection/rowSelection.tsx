import { Typography } from "@mui/material";
import { Row, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { ComponentsConfig } from "../../../../../../config/entities";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";
import { RowSelection as RowSelectionActions } from "./rowSelection.styles";

export interface RowSelectionProps<T extends RowData> {
  className?: string;
  rows: Row<T>[];
  rowSelectionView?: ComponentsConfig;
}

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

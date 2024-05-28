import { Typography } from "@mui/material";
import { Row } from "@tanstack/react-table";
import React from "react";
import { ComponentsConfig } from "../../../../../../config/entities";
import { TEXT_BODY_400 } from "../../../../../../theme/common/typography";
import { ComponentCreator } from "../../../../../ComponentCreator/ComponentCreator";
import { RowSelection as RowSelectionActions } from "./rowSelection.styles";

export interface RowSelectionProps<T> {
  className?: string;
  rows: Row<T>[];
  rowSelectionView?: ComponentsConfig;
}

export const RowSelection = <T extends object>({
  className,
  rows,
  rowSelectionView,
}: RowSelectionProps<T>): JSX.Element | null => {
  return (
    <RowSelectionActions className={className}>
      <Typography variant={TEXT_BODY_400}>
        {rows.length} items selected:
      </Typography>
      {rowSelectionView ? (
        <ComponentCreator components={rowSelectionView} response={rows} />
      ) : null}
    </RowSelectionActions>
  );
};

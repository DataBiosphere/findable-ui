import { Typography } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import React, { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";

export const BasicCell = <T extends RowData, TValue>({
  getValue,
}: CellContext<T, TValue>): JSX.Element | null => {
  const value = getValue();
  if (value === undefined || value === null) return null;
  return (
    <Typography variant={TYPOGRAPHY_PROPS.VARIANT.INHERIT}>
      {value as ReactNode}
    </Typography>
  );
};

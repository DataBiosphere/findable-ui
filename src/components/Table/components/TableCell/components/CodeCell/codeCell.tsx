import { CellContext, RowData } from "@tanstack/react-table";
import React, { ReactNode } from "react";
import { CHIP_PROPS } from "../../../../../../styles/common/mui/chip";
import { BaseComponentProps } from "../../../../../types";
import { StyledChip } from "./codeCell.styles";

export const CodeCell = <
  T extends RowData,
  TValue extends ReactNode = ReactNode
>({
  className,
  getValue,
}: BaseComponentProps & CellContext<T, TValue>): JSX.Element | null => {
  const value = getValue();
  if (!value) return null;
  return (
    <StyledChip
      className={className}
      color={CHIP_PROPS.COLOR.DEFAULT}
      label={value}
      size={CHIP_PROPS.SIZE.SMALL}
    />
  );
};

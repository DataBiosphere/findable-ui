import { CellContext, RowData } from "@tanstack/react-table";
import { BaseComponentProps } from "components/types";
import React from "react";
import { COMPONENTS } from "../../../../../MarkdownRenderer/constants";
import { StyledMarkdownRenderer } from "./markdownCell.styles";

export const MarkdownCell = <
  T extends RowData,
  TValue extends string = string
>({
  className,
  column,
  getValue,
}: BaseComponentProps & CellContext<T, TValue>): JSX.Element | null => {
  const value = getValue();
  if (!value) return null;
  const columnDef = column?.columnDef;
  const columnMeta = columnDef?.meta;
  const components = columnMeta?.components;
  return (
    <StyledMarkdownRenderer
      className={className}
      components={{ ...COMPONENTS, ...components }}
      value={value}
    />
  );
};

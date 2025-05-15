import { CellContext, RowData } from "@tanstack/react-table";
import { BaseComponentProps } from "components/types";
import React from "react";
import { COMPONENTS } from "../../../../../MarkdownRenderer/contants";
import { StyledMarkdownRenderer } from "./markdownCell.styles";
import { MarkdownCellProps } from "./types";

export const MarkdownCell = <
  T extends RowData,
  TValue extends MarkdownCellProps = MarkdownCellProps
>({
  className,
  column,
  getValue,
}: BaseComponentProps & CellContext<T, TValue>): JSX.Element | null => {
  const props = getValue();
  if (!props) return null;
  const { values } = props;
  const columnDef = column?.columnDef;
  const columnMeta = columnDef?.meta;
  const components = columnMeta?.components;
  return (
    <StyledMarkdownRenderer
      className={className}
      components={{ ...COMPONENTS, ...components }}
      value={values}
    />
  );
};

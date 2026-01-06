import { CellContext, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { COMPONENTS } from "../../../../../MarkdownRenderer/constants";
import { BaseComponentProps } from "../../../../../types";
import { getTokens, getTokensRegex, isRankedCell } from "../RankedCell/utils";
import { StyledMarkdownRenderer } from "./markdownCell.styles";

export const MarkdownCell = <
  T extends RowData,
  TValue extends string = string,
>({
  className,
  column,
  getValue,
  row,
  table,
}: BaseComponentProps & CellContext<T, TValue>): JSX.Element | null => {
  const value = getValue();
  if (!value) return null;

  // Get column metadata (components to be rendered in MarkdownRenderer).
  const columnDef = column?.columnDef;
  const columnMeta = columnDef?.meta;
  const components = columnMeta?.components;

  // Determine if the cell is ranked.
  const isRanked = isRankedCell(table, row, column.id);
  // Build regex for markdown highlighting.
  const regex = isRanked ? getTokensRegex(getTokens(table)) : undefined;

  return (
    <StyledMarkdownRenderer
      className={className}
      components={{ ...COMPONENTS, ...components }}
      regex={regex}
      value={value}
    />
  );
};

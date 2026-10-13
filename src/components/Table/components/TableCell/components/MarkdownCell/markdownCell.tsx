import { CellContext, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { COMPONENTS } from "../../../../../MarkdownRenderer/constants";
import { BaseComponentProps } from "../../../../../types";
import { getTokens, getTokensRegex, isRankedCell } from "../RankedCell/utils";
import { StyledMarkdownRenderer } from "./markdownCell.styles";

/**
 * Markdown cell, rendering the cell value as markdown with the column meta's components merged over the default components.
 * When the global filter is set and the cell's value matched it, the filter's terms are highlighted.
 * @param props - Component props, the TanStack cell context plus a class name.
 * @param props.className - Class name applied to the markdown.
 * @param props.column - TanStack column.
 * @param props.getValue - Function returning the cell value, the markdown.
 * @param props.row - TanStack row.
 * @param props.table - TanStack table instance.
 * @returns The markdown, or null when the cell value is falsy.
 */
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

import { CellContext, RowData } from "@tanstack/react-table";
import { Fragment, JSX } from "react";
import { BaseComponentProps, ChildrenProps } from "../../../../../types";
import { getTokens, getTokensRegex, isRankedCell } from "./utils";

/**
 * Ranked cell, rendering the cell value as text followed by the children.
 * When the global filter is set and the cell's value matched it, the filter's terms are highlighted.
 * @param props - Component props, the TanStack cell context plus a class name and children.
 * @param props.children - Content rendered after the value, e.g. an AnchorLink.
 * @param props.className - Class name applied to the span, which only wraps highlighted text.
 * @param props.column - TanStack column.
 * @param props.getValue - Function returning the cell value.
 * @param props.row - TanStack row.
 * @param props.table - TanStack table instance.
 * @returns The cell text, or null when the cell value is undefined or null.
 */
export const RankedCell = <
  T extends RowData,
  TValue = string | undefined | null,
>({
  /* children - e.g. AnchorLink component */
  children,
  className,
  column,
  getValue,
  row,
  table,
}: BaseComponentProps &
  CellContext<T, TValue> &
  ChildrenProps): JSX.Element | null => {
  // Get the cell value.
  const value = getValue();

  // If the cell value is undefined or null, return null.
  if (value === undefined || value === null) return null;

  // Convert the cell value to a string.
  const stringValue = String(value);

  // Check if the cell is ranked.
  const isRanked = isRankedCell(table, row, column.id);

  // Return the unranked cell, as-is.
  if (!isRanked)
    return (
      <Fragment>
        {stringValue}
        {children}
      </Fragment>
    );

  // Tokenise the current global filter.
  const tokens = getTokens(table);

  // If there are no tokens, return the value as-is.
  if (tokens.length === 0)
    return (
      <Fragment>
        {stringValue}
        {children}
      </Fragment>
    );

  // Create regex pattern.
  const regex = getTokensRegex(tokens);

  // Return the ranked cell, with highlighting.
  return (
    <span className={className}>
      {stringValue.split(regex).map((part, i) => (
        <Fragment key={i}>
          {part.match(regex) ? <mark>{part}</mark> : part}
        </Fragment>
      ))}
      {children}
    </span>
  );
};

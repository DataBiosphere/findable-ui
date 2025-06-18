import { CellContext, RowData } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { BaseComponentProps } from "../../../../../types";
import { getTokens, getTokensRegex, isRankedCell } from "./utils";

export const RankedCell = <
  T extends RowData,
  TValue = string | undefined | null
>({
  className,
  column,
  getValue,
  row,
  table,
}: BaseComponentProps & CellContext<T, TValue>): JSX.Element | null => {
  // Get the cell value.
  const value = getValue();

  // If the cell value is undefined or null, return null.
  if (value === undefined || value === null) return null;

  // Convert the cell value to a string.
  const stringValue = String(value);

  // Check if the cell is ranked.
  const isRanked = isRankedCell(table, row, column.id);

  // Return the unranked cell, as-is.
  if (!isRanked) return <Fragment>{stringValue}</Fragment>;

  // Tokenise the current global filter.
  const tokens = getTokens(table);

  // If there are no tokens, return the value as-is.
  if (tokens.length === 0) return <Fragment>{stringValue}</Fragment>;

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
    </span>
  );
};

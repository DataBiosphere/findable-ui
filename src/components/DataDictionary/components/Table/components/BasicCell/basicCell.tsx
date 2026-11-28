import { Typography } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import type { CellValueProps } from "../../../../../types";
import { parseValue } from "./utils";

/**
 * Data dictionary table cell rendering the cell value as text, with a boolean shown as "true" or "false".
 * @param props - Component props, the cell value getter; a TanStack cell context satisfies them.
 * @param props.getValue - Function returning the cell value.
 * @returns The cell text, or null when the value is null or undefined.
 */
export const BasicCell = <TValue extends ReactNode = ReactNode>({
  getValue,
}: CellValueProps<TValue>): JSX.Element | null => {
  const value = getValue();
  if (value === undefined || value === null) return null;
  return (
    <Typography variant={TYPOGRAPHY_PROPS.VARIANT.INHERIT}>
      {parseValue(value)}
    </Typography>
  );
};

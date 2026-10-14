import { ClassAttributes, JSX, TableHTMLAttributes } from "react";
import type { BaseComponentProps } from "../../../types";
import { StyledTable } from "./table.styles";

/**
 * Table rendered from markdown.
 * @param props - Table element props.
 * @returns The table.
 */
export const Table = (
  props: BaseComponentProps &
    ClassAttributes<HTMLTableElement> &
    TableHTMLAttributes<HTMLTableElement>,
): JSX.Element => {
  return (
    <StyledTable className={props.className}>{props.children}</StyledTable>
  );
};

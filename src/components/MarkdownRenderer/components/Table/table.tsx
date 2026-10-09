import { ClassAttributes, JSX, TableHTMLAttributes } from "react";
import type { BaseComponentProps } from "../../../types";
import { StyledTable } from "./table.styles";

export const Table = (
  props: BaseComponentProps &
    ClassAttributes<HTMLTableElement> &
    TableHTMLAttributes<HTMLTableElement>,
): JSX.Element => {
  return (
    <StyledTable className={props.className}>{props.children}</StyledTable>
  );
};

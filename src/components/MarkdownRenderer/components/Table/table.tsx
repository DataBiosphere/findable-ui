import { BaseComponentProps } from "components/types";
import { JSX, ClassAttributes, TableHTMLAttributes } from "react";
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

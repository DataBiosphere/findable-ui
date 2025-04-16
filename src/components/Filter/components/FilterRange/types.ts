import { BaseComponentProps } from "../../../types";

export interface FilterRangeProps extends BaseComponentProps {}

export enum RANGE_OPERATOR {
  BETWEEN = "between",
  GREATER_THAN = "greaterThan",
  LESS_THAN = "lessThan",
}

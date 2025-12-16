import { StackProps } from "@mui/material";

type StackPropsOptions = {
  DIRECTION: typeof DIRECTION;
};

const DIRECTION: Record<string, StackProps["direction"]> = {
  COLUMN: "column",
  COLUMN_REVERSE: "column-reverse",
  ROW: "row",
  ROW_REVERSE: "row-reverse",
};

export const STACK_PROPS: StackPropsOptions = {
  DIRECTION,
};

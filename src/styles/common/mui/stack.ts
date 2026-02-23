import { StackProps } from "@mui/material";

type StackPropsOptions = {
  ALIGN_ITEMS: typeof ALIGN_ITEMS;
  DIRECTION: typeof DIRECTION;
  FLEX_WRAP: typeof FLEX_WRAP;
};

const ALIGN_ITEMS: Record<string, StackProps["alignItems"]> = {
  BASELINE: "baseline",
  CENTER: "center",
  FLEX_END: "flex-end",
  FLEX_START: "flex-start",
  STRETCH: "stretch",
} as const;

const DIRECTION: Record<string, StackProps["direction"]> = {
  COLUMN: "column",
  COLUMN_REVERSE: "column-reverse",
  ROW: "row",
  ROW_REVERSE: "row-reverse",
} as const;

const FLEX_WRAP: Record<string, StackProps["flexWrap"]> = {
  WRAP: "wrap",
  WRAP_REVERSE: "wrap-reverse",
} as const;

export const STACK_PROPS: StackPropsOptions = {
  ALIGN_ITEMS,
  DIRECTION,
  FLEX_WRAP,
};

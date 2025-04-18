import { ComponentProps } from "react";
import { Table } from "../table";

export const BOOLEAN_CONTROLS: (keyof ComponentProps<typeof Table>)[] = [
  "collapsable",
];

export const DISABLED_CONTROLS: (keyof ComponentProps<typeof Table>)[] = [
  "className",
  "columns",
  "gridTemplateColumns",
  "items",
  "tableOptions",
  "tableView",
];

import { ComponentProps } from "react";
import { fn } from "storybook/test";
import { TablePagination } from "../tablePagination";

export const DEFAULT_ARGS: ComponentProps<typeof TablePagination> = {
  canNextPage: true,
  canPreviousPage: false,
  currentPage: 1,
  onNextPage: fn(),
  onPreviousPage: fn(),
  totalPage: 10,
};

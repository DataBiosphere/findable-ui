import { RowData, TableOptions } from "@tanstack/react-table";
import { Attribute } from "../../../../../common/entities";
import { CORE_OPTIONS } from "./core/constants";
import { SORTING_OPTIONS } from "./sorting/constants";

export const useTableOptions = <T extends RowData = Attribute>(): Omit<
  TableOptions<T>,
  "columns" | "data"
> => {
  return {
    ...CORE_OPTIONS,
    ...SORTING_OPTIONS,
  };
};

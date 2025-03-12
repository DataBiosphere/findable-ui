import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "../../../../../common/entities";
import { CORE_OPTIONS } from "./core/constants";
import { SORTING_OPTIONS } from "./sorting/constants";

export const useTableOptions = (): Omit<
  TableOptions<Attribute>,
  "columns" | "data"
> => {
  return {
    ...CORE_OPTIONS,
    ...SORTING_OPTIONS,
  };
};

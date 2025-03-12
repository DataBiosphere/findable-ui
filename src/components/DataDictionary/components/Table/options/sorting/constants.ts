import { SortingOptions } from "@tanstack/react-table";
import { Attribute } from "../../../../../../common/entities";

export const SORTING_OPTIONS: Pick<
  SortingOptions<Attribute>,
  "enableSorting"
> = {
  enableSorting: false,
};

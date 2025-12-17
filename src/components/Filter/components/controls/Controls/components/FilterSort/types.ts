import { ComponentProps } from "react";
import { FILTER_SORT } from "../../../../../../../common/filters/sort/config/types";
import { Button } from "./components/Button/button";
import { IconButton } from "./components/IconButton/iconButton";

export type FilterSortProps = {
  button?: (props: ComponentProps<typeof Button>) => JSX.Element;
  enabled?: boolean;
  filterSort?: FILTER_SORT;
  iconButton?: (props: ComponentProps<typeof IconButton>) => JSX.Element;
  onFilterSortChange?: (filterSort: FILTER_SORT) => void;
};

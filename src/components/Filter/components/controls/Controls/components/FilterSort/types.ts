import { ComponentType } from "react";
import { FILTER_SORT } from "../../../../../../../common/filters/sort/config/types";
import type { ButtonProps } from "./components/Button/types";
import type { IconButtonProps } from "./components/IconButton/types";

export type FilterSortProps = {
  Button?: ComponentType<ButtonProps> | ComponentType<IconButtonProps>;
  enabled?: boolean;
  filterSort?: FILTER_SORT;
  onFilterSortChange?: (filterSort: FILTER_SORT) => void;
};

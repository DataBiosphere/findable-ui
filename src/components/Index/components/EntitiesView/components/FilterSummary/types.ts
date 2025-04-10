import { CategoryFilter } from "../../../../../Filter/components/Filters/filters";
import { TestIdProps } from "../../../../../types";

export interface FilterSummaryProps extends TestIdProps {
  categoryFilters: CategoryFilter[];
  loading: boolean;
}

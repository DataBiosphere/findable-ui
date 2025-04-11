import { CategoryFilter } from "../../../../../Filter/components/Filters/filters";
import { TestIdProps } from "../../../../../types";

export interface ChartViewProps extends TestIdProps {
  categoryFilters: CategoryFilter[];
  loading: boolean;
}

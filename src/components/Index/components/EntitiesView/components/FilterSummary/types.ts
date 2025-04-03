import { CategoryFilter } from "../../../../../Filter/components/Filters/filters";
import { SelectCategoryView } from "../../../../../../common/entities";

export interface ChartDataPoint {
  count: number;
  label: string;
  selected: boolean;
}

export interface FilterBarChartProps {
  categoryView: SelectCategoryView;
}

export interface FilterSummaryProps {
  categoryFilters: CategoryFilter[];
}

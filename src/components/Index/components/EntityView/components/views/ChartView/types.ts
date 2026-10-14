import { EntityConfig } from "../../../../../../../config/entities";
import { CategoryFilter } from "../../../../../../Filter/components/Filters/filters";
import { TestIdProps } from "../../../../../../types";

/**
 * Props for the ChartView component.
 */
export interface ChartViewProps extends TestIdProps {
  categoryFilters: CategoryFilter[];
  entityName: EntityConfig["label"];
  loading: boolean;
}

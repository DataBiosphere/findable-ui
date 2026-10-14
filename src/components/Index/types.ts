import type { EntityConfig } from "../../config/entities";
import { CategoryFilter } from "../Filter/components/Filters/filters";
import type { BaseComponentProps } from "../types";

/**
 * Props for the Index component.
 */
export interface IndexProps extends BaseComponentProps {
  categoryFilters: CategoryFilter[];
  entityListType: string;
  entityName: EntityConfig["label"];
  loading: boolean;
}

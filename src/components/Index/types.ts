import { BaseComponentProps } from "../../components/types";
import { EntityConfig } from "../../config/entities";
import { CategoryFilter } from "../../components/Filter/components/Filters/filters";

export interface IndexProps extends BaseComponentProps {
  categoryFilters: CategoryFilter[];
  entityListType: string;
  entityName: EntityConfig["label"];
  loading: boolean;
}

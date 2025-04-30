import { BaseComponentProps } from "components/types";
import { EntityConfig } from "config/entities";
import { ReactNode } from "react";
import { CategoryFilter } from "../../components/Filter/components/Filters/filters";

export interface IndexProps extends BaseComponentProps {
  categoryFilters: CategoryFilter[];
  entityListType: string;
  entityName: EntityConfig["label"];
  ListHero?: ReactNode | ReactNode[];
  loading: boolean;
  SideBarButton?: ReactNode;
  SubTitleHero?: ReactNode | ReactNode[];
  Summaries?: ReactNode;
  Tabs?: ReactNode;
  title: ReactNode;
}

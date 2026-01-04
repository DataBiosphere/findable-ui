import { ReactNode } from "react";
import { EntityListTable } from "../../table/types";
import { ExploreViewProps } from "../../../types";
import { EntityListFilter } from "../types";
import { EntityListFilterController } from "../controller/types";

export interface FilterSelectorProps<T = unknown>
  extends
    Pick<ExploreViewProps<T>, "entityListType">,
    Pick<EntityListFilterController, "filterSort">,
    EntityListTable<T> {
  children: (props: EntityListFilter) => ReactNode;
}

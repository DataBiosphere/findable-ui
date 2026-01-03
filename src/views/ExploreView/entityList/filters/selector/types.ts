import { ReactNode } from "react";
import { EntityListTable } from "../../table/types";
import { ExploreViewProps } from "../../../types";
import { EntityListFilter } from "../types";

export interface FilterSelectorProps<T = unknown>
  extends EntityListTable<T>, Pick<ExploreViewProps<T>, "entityListType"> {
  children: (props: EntityListFilter) => ReactNode;
}

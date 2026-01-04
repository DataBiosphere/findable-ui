import { ReactNode } from "react";
import { EntityListData } from "../../data/types";
import { ExploreViewProps } from "../../../types";
import { EntityListTable } from "../types";

export interface TableSelectorProps<T = unknown>
  extends
    Pick<EntityListData<T>, "data">,
    Pick<ExploreViewProps<T>, "entityListType"> {
  children: (props: EntityListTable<T>) => ReactNode;
}

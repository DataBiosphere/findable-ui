import { ExploreViewProps } from "../../../types";
import { ReactNode } from "react";
import { EntityListData } from "../types";

export interface DataSelectorProps<T = unknown> extends ExploreViewProps<T> {
  children: (props: EntityListData<T>) => ReactNode;
}

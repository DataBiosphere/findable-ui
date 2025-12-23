import { ExploreViewProps } from "../../types";
import { ReactNode } from "react";
import { EntityListProps } from "../types";

export interface EntityListStrategyProps<T = unknown> extends Pick<
  ExploreViewProps,
  "entityListType"
> {
  children: (props: EntityListProps<T>) => ReactNode;
}

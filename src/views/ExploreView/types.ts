import { BaseComponentProps } from "../../components/types";

export interface ExploreViewProps<T = unknown> extends BaseComponentProps {
  data?: T[];
  entityListType: string;
}

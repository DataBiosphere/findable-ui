import { ComponentProps } from "react";
import { BaseComponentProps, ChildrenProps } from "../../../../../types";
import { FilterSort } from "../../../controls/Controls/components/FilterSort/filterSort";

export interface ControlsProps
  extends BaseComponentProps,
    ChildrenProps,
    Omit<ComponentProps<typeof FilterSort>, "enabled"> {
  filterSortEnabled?: boolean;
}

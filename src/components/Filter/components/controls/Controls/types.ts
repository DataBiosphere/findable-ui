import { BaseComponentProps } from "../../../../types";
import { SurfaceProps } from "../../surfaces/types";
import { FilterSortProps } from "./components/FilterSort/types";

export interface ControlsProps
  extends BaseComponentProps,
    Pick<SurfaceProps, "onFilter">,
    Pick<FilterSortProps, "filterSort" | "onFilterSortChange"> {
  filterSortEnabled?: boolean;
}

import { ReactNode } from "react";
import { LayoutSpacing } from "../../../../../../hooks/UseLayoutSpacing/types";

/**
 * Props for the FiltersLayout component.
 */
export interface FiltersLayoutProps extends LayoutSpacing {
  children: ReactNode;
}

import { ReactNode } from "react";
import { LayoutSpacing } from "../../../../../../hooks/UseLayoutSpacing/types";

/**
 * Props for the OutlineLayout component.
 */
export interface OutlineLayoutProps extends LayoutSpacing {
  children: ReactNode;
}

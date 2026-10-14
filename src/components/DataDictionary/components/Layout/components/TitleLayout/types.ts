import { ReactNode } from "react";
import { LayoutSpacing } from "../../../../../../hooks/UseLayoutSpacing/types";

/**
 * Props for the TitleLayout component.
 */
export interface TitleLayoutProps extends LayoutSpacing {
  children: ReactNode;
}

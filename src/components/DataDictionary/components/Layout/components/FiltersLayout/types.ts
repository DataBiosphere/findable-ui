import { ReactNode } from "react";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";

export interface FiltersLayoutProps extends LayoutSpacing {
  children: ReactNode;
}

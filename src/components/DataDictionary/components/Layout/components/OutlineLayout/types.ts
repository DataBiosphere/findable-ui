import { ReactNode } from "react";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";

export interface OutlineLayoutProps extends LayoutSpacing {
  children: ReactNode;
}

import { ReactNode } from "react";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";

export interface EntitiesLayoutProps extends LayoutSpacing {
  children: ReactNode;
}

import { ReactNode } from "react";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";

export interface TitleLayoutProps extends LayoutSpacing {
  children: ReactNode;
}

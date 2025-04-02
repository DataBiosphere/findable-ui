import { BaseComponentProps } from "components/types";
import { ReactNode } from "react";

export interface IndexProps extends BaseComponentProps {
  filterSummary?: ReactNode;
  List?: ReactNode;
  ListHero?: ReactNode | ReactNode[];
  SideBarButton?: ReactNode;
  SubTitleHero?: ReactNode | ReactNode[];
  Summaries?: ReactNode;
  Tabs?: ReactNode;
  title: ReactNode;
}

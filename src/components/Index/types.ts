import { BaseComponentProps } from "components/types";
import { ReactNode } from "react";

export interface IndexProps extends BaseComponentProps {
  chart?: ReactNode;
  list?: ReactNode;
  ListHero?: ReactNode | ReactNode[];
  SideBarButton?: ReactNode;
  SubTitleHero?: ReactNode | ReactNode[];
  Summaries?: ReactNode;
  Tabs?: ReactNode;
  title: ReactNode;
}

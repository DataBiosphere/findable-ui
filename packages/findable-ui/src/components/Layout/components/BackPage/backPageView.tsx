import React, { ReactNode } from "react";
import {
  BackPageContent,
  BackPageContentMainColumn,
  BackPageContentSideColumn,
  BackPageContentSingleColumn,
  BackPageHero,
  BackPageTabs,
  BackPageView as BackPageLayout,
  DetailPageOverviewContent,
  DetailPageOverviewContentMainColumn,
  DetailPageOverviewContentSideColumn,
} from "./backPageView.styles";

export interface BackPageViewProps {
  isDetailOverview?: boolean;
  mainColumn: ReactNode;
  sideColumn?: ReactNode;
  Tabs?: ReactNode;
  top: ReactNode;
}

export const BackPageView = ({
  isDetailOverview = false,
  mainColumn,
  sideColumn,
  Tabs,
  top,
}: BackPageViewProps): JSX.Element => {
  const Content = isDetailOverview
    ? DetailPageOverviewContent
    : BackPageContent;
  const MainColumn = isDetailOverview
    ? DetailPageOverviewContentMainColumn
    : sideColumn
    ? BackPageContentMainColumn
    : BackPageContentSingleColumn;
  const SideColumn = isDetailOverview
    ? DetailPageOverviewContentSideColumn
    : BackPageContentSideColumn;
  return (
    <BackPageLayout>
      <BackPageHero>{top}</BackPageHero>
      {Tabs && <BackPageTabs>{Tabs}</BackPageTabs>}
      <Content>
        <MainColumn>{mainColumn}</MainColumn>
        {sideColumn && <SideColumn>{sideColumn}</SideColumn>}
      </Content>
    </BackPageLayout>
  );
};

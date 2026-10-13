import { Fragment, JSX, ReactNode } from "react";
import {
  BackPageContent,
  BackPageContentMainColumn,
  BackPageContentSideColumn,
  BackPageHero,
  BackPageView as BackPageLayout,
  BackPageTabs,
  DetailPageOverviewContent,
  DetailPageOverviewContentMainColumn,
  DetailPageOverviewContentSideColumn,
} from "./backPageView.styles";

/**
 * Props for the BackPageView component.
 */
export interface BackPageViewProps {
  isDetailOverview?: boolean;
  mainColumn: ReactNode;
  sideColumn?: ReactNode;
  Tabs?: ReactNode;
  top: ReactNode;
}

/**
 * Back page layout, rendering the hero, optional tabs, and the main and side column content.
 * The main column is wrapped in a column only when there is a side column, unless this is a detail overview page.
 * @param props - Component props.
 * @param props.isDetailOverview - Whether to use the detail page overview content layout; defaults to false.
 * @param props.mainColumn - Main column content.
 * @param props.sideColumn - Side column content, rendered when truthy.
 * @param props.Tabs - Tabs, rendered below the hero when truthy.
 * @param props.top - Hero content.
 * @returns The back page layout.
 */
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
      : Fragment;
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

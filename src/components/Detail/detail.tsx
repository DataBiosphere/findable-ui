import { JSX, ReactNode } from "react";
import { BackPageView } from "../Layout/components/BackPage/backPageView";

/**
 * Props for the Detail component.
 */
export interface DetailProps {
  isDetailOverview?: boolean;
  mainColumn: ReactNode;
  sideColumn?: ReactNode;
  Tabs?: ReactNode;
  top: ReactNode;
}

/**
 * Detail page layout.
 * @param props - Component props.
 * @param props.isDetailOverview - Whether the page is the overview tab.
 * @param props.mainColumn - Main column content.
 * @param props.sideColumn - Side column content.
 * @param props.Tabs - Tabs content.
 * @param props.top - Content above the columns.
 * @returns The detail page layout.
 */
export const Detail = ({
  isDetailOverview,
  mainColumn,
  sideColumn,
  Tabs,
  top,
}: DetailProps): JSX.Element => {
  return (
    <BackPageView
      isDetailOverview={isDetailOverview}
      mainColumn={mainColumn}
      sideColumn={sideColumn}
      Tabs={Tabs}
      top={top}
    />
  );
};

import React, { ReactNode } from "react";
import { BackPageView } from "../Layout/components/BackPage/backPageView";

export interface DetailProps {
  isDetailOverview?: boolean;
  mainColumn: ReactNode;
  sideColumn?: ReactNode;
  Tabs?: ReactNode;
  top: ReactNode;
}

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

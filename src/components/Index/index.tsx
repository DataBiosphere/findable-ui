import React from "react";
import { useLayoutDimensions } from "../../providers/layoutDimensions/hook";
import { EntitiesView } from "./components/EntitiesView/entitiesView";
import { useEntitiesView } from "./components/EntitiesView/hooks/UseEntitiesView/hook";
import { Hero } from "./components/Hero/hero";
import { Index as IndexLayout } from "./index.styles";
import { IndexProps } from "./types";

export const Index = ({
  className,
  filterSummary,
  list,
  ListHero,
  SideBarButton,
  SubTitleHero,
  Summaries,
  Tabs,
  title,
}: IndexProps): JSX.Element => {
  const { onChange, viewStatus } = useEntitiesView();
  const { dimensions } = useLayoutDimensions();
  return (
    <IndexLayout className={className} marginTop={dimensions.header.height}>
      <Hero SideBarButton={SideBarButton} Summaries={Summaries} title={title} />
      {SubTitleHero}
      {Tabs}
      {ListHero}
      <EntitiesView onChange={onChange} viewStatus={viewStatus}>
        {viewStatus.isTableView ? list : filterSummary}
      </EntitiesView>
    </IndexLayout>
  );
};

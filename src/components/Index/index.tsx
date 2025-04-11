import React from "react";
import { useLayoutDimensions } from "../../providers/layoutDimensions/hook";
import { EntitiesView } from "./components/EntitiesView/entitiesView";
import { useEntitiesView } from "./components/EntitiesView/hooks/UseEntitiesView/hook";
import { VIEW_MODE } from "./components/EntitiesView/hooks/UseEntitiesView/types";
import { Hero } from "./components/Hero/hero";
import { Index as IndexLayout } from "./index.styles";
import { IndexProps } from "./types";

export const Index = ({
  chart,
  className,
  list,
  ListHero,
  SideBarButton,
  SubTitleHero,
  Summaries,
  Tabs,
  title,
}: IndexProps): JSX.Element => {
  const { onChange, viewMode, viewStatus } = useEntitiesView();
  const { dimensions } = useLayoutDimensions();
  return (
    <IndexLayout className={className} marginTop={dimensions.header.height}>
      <Hero SideBarButton={SideBarButton} Summaries={Summaries} title={title} />
      {SubTitleHero}
      {Tabs}
      {ListHero}
      <EntitiesView
        onChange={onChange}
        viewMode={viewMode}
        viewStatus={viewStatus}
      >
        {viewMode === VIEW_MODE.TABLE ? list : chart}
      </EntitiesView>
    </IndexLayout>
  );
};

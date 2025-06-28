import React from "react";
import { useLayoutDimensions } from "../../providers/layoutDimensions/hook";
import { ChartView } from "./components/EntitiesView/components/ChartView/chartView";
import { EntityList } from "./components/EntitiesView/components/EntityList/entityList";
import { EntitiesView } from "./components/EntitiesView/entitiesView";
import { useEntitiesView } from "./components/EntitiesView/hooks/UseEntitiesView/hook";
import { VIEW_MODE } from "./components/EntitiesView/hooks/UseEntitiesView/types";
import { ExportButton } from "./components/ExportButton/exportButton";
import { Hero } from "./components/Hero/hero";
import { Tabs } from "./components/Tabs/tabs";
import { Title } from "./components/Title/title";
import { Index as IndexLayout } from "./index.styles";
import { useTable } from "./table/hook";
import { IndexProps } from "./types";

export const Index = ({
  categoryFilters,
  className,
  entityListType,
  entityName,
  ListHero,
  loading,
  SideBarButton,
  SubTitleHero,
  Summaries,
}: IndexProps): JSX.Element => {
  const { onChange, viewMode, viewStatus } = useEntitiesView();
  const { dimensions } = useLayoutDimensions();
  const { table } = useTable({ entityListType });
  return (
    <IndexLayout className={className} marginTop={dimensions.header.height}>
      <Title />
      <ExportButton />
      <Hero SideBarButton={SideBarButton} Summaries={Summaries} />
      {SubTitleHero}
      <Tabs />
      {ListHero}
      <EntitiesView
        onChange={onChange}
        viewMode={viewMode}
        viewStatus={viewStatus}
      >
        {viewMode === VIEW_MODE.TABLE ? (
          <EntityList
            entityListType={entityListType}
            loading={loading}
            table={table}
          />
        ) : (
          <ChartView
            categoryFilters={categoryFilters}
            entityName={entityName}
            loading={loading}
          />
        )}
      </EntitiesView>
    </IndexLayout>
  );
};

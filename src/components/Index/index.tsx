import React from "react";
import { useLayoutDimensions } from "../../providers/layoutDimensions/hook";
import { ChartView } from "./components/EntitiesView/components/ChartView/chartView";
import { EntityList } from "./components/EntitiesView/components/EntityList/entityList";
import { EntitiesView } from "./components/EntitiesView/entitiesView";
import { useEntitiesView } from "./components/EntitiesView/hooks/UseEntitiesView/hook";
import { VIEW_MODE } from "./components/EntitiesView/hooks/UseEntitiesView/types";
import { ListHero } from "./components/ListViews/components/ListHero/listHero";
import { ListViewHero } from "./components/ListViews/components/ListViewHero/listViewHero";
import { SubTitleHero } from "./components/ListViews/components/SubTitleHero/subTitleHero";
import { Title } from "./components/Title/title";
import { StyledGrid } from "./index.styles";
import { useTable } from "./table/hook";
import { IndexProps } from "./types";

export const Index = ({
  categoryFilters,
  className,
  entityListType,
  entityName,
  loading,
}: IndexProps): JSX.Element => {
  const { onChange, viewMode, viewStatus } = useEntitiesView();
  const { dimensions } = useLayoutDimensions();
  const { table } = useTable({ entityListType });
  return (
    <StyledGrid className={className} top={dimensions.header.height}>
      {/* Title */}
      <Title />
      {/* Subtitle or Alerts */}
      <SubTitleHero />
      {/* Tabs, Summary, Export, Filter */}
      <ListViewHero />
      {/* Alerts */}
      <ListHero />
      {/* Table or Graph */}
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
    </StyledGrid>
  );
};

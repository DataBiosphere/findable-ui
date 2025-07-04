import React from "react";
import { useLayoutDimensions } from "../../providers/layoutDimensions/hook";
import { GridPaper } from "../common/Paper/paper.styles";
import { ListHero } from "./components/EntityControls/components/ListHero/listHero";
import { ListViewHero } from "./components/EntityControls/components/ListViewHero/listViewHero";
import { SubTitleHero } from "./components/EntityControls/components/SubTitleHero/subTitleHero";
import { Title } from "./components/EntityControls/components/Title/title";
import { ChartView } from "./components/EntityView/components/ChartView/chartView";
import { TableView } from "./components/EntityView/components/TableView/tableView";
import { useViewToggle } from "./components/EntityView/components/common/ViewToggle/hooks/UseViewToggle/hook";
import { VIEW_MODE } from "./components/EntityView/components/common/ViewToggle/hooks/UseViewToggle/types";
import { EntityViewContext } from "./components/EntityView/context/context";
import { StyledFluidPaper, StyledGrid } from "./index.styles";
import { useTable } from "./table/hook";
import { IndexProps } from "./types";

export const Index = ({
  categoryFilters,
  className,
  entityListType,
  entityName,
  loading,
}: IndexProps): JSX.Element => {
  const { onChange, viewMode, viewStatus } = useViewToggle();
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
      <EntityViewContext.Provider value={{ onChange, viewMode, viewStatus }}>
        <StyledFluidPaper elevation={0}>
          <GridPaper>
            {viewMode === VIEW_MODE.TABLE ? (
              <TableView
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
          </GridPaper>
        </StyledFluidPaper>
      </EntityViewContext.Provider>
    </StyledGrid>
  );
};

import { Grid } from "@mui/material";
import { JSX, useRef } from "react";
import { useLayoutSpacing } from "../../hooks/UseLayoutSpacing/hook";
import {
  getBorderBoxSizeHeight,
  useResizeObserver,
} from "../../hooks/useResizeObserver";
import { ActionButton } from "./components/EntityView/components/controls/ActionButton/actionButton";
import { ExportButton } from "./components/EntityView/components/controls/ExportButton/exportButton";
import { FilterButton } from "./components/EntityView/components/controls/FilterButton/filterButton";
import { useViewToggle } from "./components/EntityView/components/controls/ViewToggle/hooks/UseViewToggle/hook";
import { VIEW_MODE } from "./components/EntityView/components/controls/ViewToggle/hooks/UseViewToggle/types";
import { Summary } from "./components/EntityView/components/layout/Summary/summary";
import { Title } from "./components/EntityView/components/layout/Title/title";
import { Tabs } from "./components/EntityView/components/navigation/Tabs/tabs";
import { EntityListSlot } from "./components/EntityView/components/slots/EntityListSlot/entityListSlot";
import { EntityViewSlot } from "./components/EntityView/components/slots/EntityViewSlot/entityViewSlot";
import { LazyChartView } from "./components/EntityView/components/views/ChartView/lazyChartView";
import { TableView } from "./components/EntityView/components/views/TableView/tableView";
import { EntityViewContext } from "./components/EntityView/context/context";
import {
  StyledFluidPaper,
  StyledGridEntityLayout,
  StyledGridEntityList,
  StyledGridEntityView,
  StyledStickyGap,
} from "./indexView.styles";
import { useTable } from "./table/hook";
import { IndexProps } from "./types";

/**
 * Entity list view: the title, tabs, summary and controls above the entity list, shown as a table or, in the graph view mode, the lazily loaded chart view.
 * Provides the view mode, its change handler and the view status through the entity view context.
 * @param props - Component props.
 * @param props.categoryFilters - Category filters, charted in the graph view.
 * @param props.className - Class name applied to the view.
 * @param props.entityListType - Entity list type.
 * @param props.entityName - Entity name, used in the chart titles.
 * @param props.loading - Whether the entity list is loading.
 * @returns The entity list view.
 */
export const Index = ({
  categoryFilters,
  className,
  entityListType,
  entityName,
  loading,
}: IndexProps): JSX.Element => {
  const { onChange, viewMode, viewStatus } = useViewToggle();
  const { spacing } = useLayoutSpacing();
  const { table } = useTable({ entityListType });
  const entityLayoutRef = useRef<HTMLDivElement>(null);
  const { height: entityLayoutHeight = 0 } =
    useResizeObserver(entityLayoutRef, getBorderBoxSizeHeight) || {};
  return (
    <StyledGridEntityView
      className={className}
      entityLayoutHeight={entityLayoutHeight}
      {...spacing}
    >
      {/* Entity view alerts or other */}
      <EntityViewSlot />
      {/* Entity layout */}
      <StyledGridEntityLayout container ref={entityLayoutRef}>
        <Title />
        <Tabs />
        <Grid container offset="auto">
          <Summary />
          <Grid container gap={2}>
            <ActionButton />
            <ExportButton />
            <FilterButton />
          </Grid>
        </Grid>
      </StyledGridEntityLayout>
      {/* Entity */}
      <EntityViewContext.Provider value={{ onChange, viewMode, viewStatus }}>
        <StyledGridEntityList container>
          {/* Entity alerts or other */}
          <EntityListSlot />
          <StyledStickyGap />
          {/* Entity table or graph */}
          <StyledFluidPaper elevation={0}>
            {viewMode === VIEW_MODE.TABLE ? (
              <TableView
                entityListType={entityListType}
                loading={loading}
                table={table}
              />
            ) : (
              <LazyChartView
                categoryFilters={categoryFilters}
                entityName={entityName}
                loading={loading}
              />
            )}
          </StyledFluidPaper>
        </StyledGridEntityList>
      </EntityViewContext.Provider>
    </StyledGridEntityView>
  );
};

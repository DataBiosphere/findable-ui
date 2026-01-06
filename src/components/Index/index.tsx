import { Grid } from "@mui/material";
import { JSX } from "react";
import { useLayoutSpacing } from "../../hooks/UseLayoutSpacing/hook";
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
import { ChartView } from "./components/EntityView/components/views/ChartView/chartView";
import { TableView } from "./components/EntityView/components/views/TableView/tableView";
import { EntityViewContext } from "./components/EntityView/context/context";
import {
  StyledFluidPaper,
  StyledGridEntityLayout,
  StyledGridEntityList,
  StyledGridEntityView,
} from "./index.styles";
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
  const { spacing } = useLayoutSpacing();
  const { table } = useTable({ entityListType });
  return (
    <StyledGridEntityView className={className} {...spacing}>
      {/* Entity view alerts or other */}
      <EntityViewSlot />
      {/* Entity layout */}
      <StyledGridEntityLayout container>
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
          {/* Entity table or graph */}
          <StyledFluidPaper elevation={0}>
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
          </StyledFluidPaper>
        </StyledGridEntityList>
      </EntityViewContext.Provider>
    </StyledGridEntityView>
  );
};

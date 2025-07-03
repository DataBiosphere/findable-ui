import { Grid } from "@mui/material";
import React from "react";
import { ExportButton } from "../../../../components/ExportButton/exportButton";
import { FilterButton } from "../../../../components/FilterButton/filterButton";
import { Summary } from "../../../../components/Summary/summary";
import { Tabs } from "../../../../components/Tabs/tabs";
import { StyledGrid } from "./listViewHero.styles";

export const ListViewHero = (): JSX.Element => {
  return (
    <StyledGrid container>
      <Tabs />
      <Summary />
      <Grid container gap={2}>
        <ExportButton />
        <FilterButton />
      </Grid>
    </StyledGrid>
  );
};

import { Grid } from "@mui/material";
import React from "react";
import { ExportButton } from "../ExportButton/exportButton";
import { FilterButton } from "../FilterButton/filterButton";
import { Summary } from "../Summary/summary";
import { Tabs } from "../Tabs/tabs";
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

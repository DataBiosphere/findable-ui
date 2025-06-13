import { GridProps } from "@mui/material";
import { ComponentProps } from "react";
import { NoResults } from "../../../NoResults/noResults";
import { StyledRoundedPaper } from "./entities.styles";

export const GRID_PROPS: GridProps = {
  container: true,
  direction: "column",
  flexWrap: "nowrap",
  rowGap: 8,
};

export const NO_RESULTS_PROPS: ComponentProps<typeof NoResults> = {
  Paper: StyledRoundedPaper,
  title: "No results found",
};

import { GridProps } from "@mui/material";
import { ComponentProps } from "react";
import { NoResults } from "../../../NoResults/noResults";
import { StyledRoundedPaper } from "./entities.styles";

export const ENTITIES_ROW_GAP = 8;

export const GRID_PROPS: GridProps = {
  container: true,
  direction: "column",
  flexWrap: "nowrap",
  rowGap: ENTITIES_ROW_GAP,
};

export const NO_RESULTS_PROPS: ComponentProps<typeof NoResults> = {
  Paper: StyledRoundedPaper,
  title: "No results found",
};

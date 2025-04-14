import { ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import React from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import { GridPaper } from "../../../common/Paper/paper.styles";
import { StyledFluidPaper } from "./entitiesView.styles";
import { VIEW_MODE } from "./hooks/UseEntitiesView/types";
import { EntitiesViewProps } from "./types";

export const EntitiesView = ({
  children,
  onChange,
  viewMode,
  viewStatus,
}: EntitiesViewProps): JSX.Element => {
  return (
    <StyledFluidPaper testId={TEST_IDS.ENTITIES_VIEW}>
      <GridPaper>
        {viewStatus.disabled ? null : (
          <Toolbar>
            <ToggleButtonGroup exclusive value={viewMode} onChange={onChange}>
              <ToggleButton value={VIEW_MODE.TABLE}>Table View</ToggleButton>
              <ToggleButton value={VIEW_MODE.CHART}>Chart View</ToggleButton>
            </ToggleButtonGroup>
          </Toolbar>
        )}
        {children}
      </GridPaper>
    </StyledFluidPaper>
  );
};

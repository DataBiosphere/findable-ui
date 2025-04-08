import { ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import React from "react";
import { GridPaper } from "../../../common/Paper/paper.styles";
import { StyledFluidPaper } from "./entitiesView.styles";
import { VIEW_MODE } from "./hooks/UseEntitiesView/types";
import { EntitiesViewProps } from "./types";

export const EntitiesView = ({
  children,
  onChange,
  testId,
  viewMode,
  viewStatus,
}: EntitiesViewProps): JSX.Element => {
  return (
    <StyledFluidPaper testId={testId}>
      <GridPaper>
        {viewStatus.disabled ? null : (
          <Toolbar>
            <ToggleButtonGroup exclusive value={viewMode} onChange={onChange}>
              <ToggleButton value={VIEW_MODE.TABLE}>Table View</ToggleButton>
              <ToggleButton value={VIEW_MODE.FILTER}>
                Filter Summary
              </ToggleButton>
            </ToggleButtonGroup>
          </Toolbar>
        )}
        {children}
      </GridPaper>
    </StyledFluidPaper>
  );
};

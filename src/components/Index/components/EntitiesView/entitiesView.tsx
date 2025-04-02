import { ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import React from "react";
import { GridPaper } from "../../../common/Paper/paper.styles";
import { StyledFluidPaper } from "./entitiesViews.styles";
import { VIEW_TYPE } from "./hooks/UseEntitiesView/types";
import { EntitiesViewProps } from "./types";

export const EntitiesView = ({
  children,
  onChange,
  viewStatus,
}: EntitiesViewProps): JSX.Element => {
  return (
    <StyledFluidPaper>
      <GridPaper>
        {viewStatus.disabled ? null : (
          <Toolbar>
            <ToggleButtonGroup
              exclusive
              value={
                viewStatus.isTableView ? VIEW_TYPE.TABLE : VIEW_TYPE.FILTER
              }
              onChange={onChange}
            >
              <ToggleButton value={VIEW_TYPE.TABLE}>Table View</ToggleButton>
              <ToggleButton value={VIEW_TYPE.FILTER}>
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

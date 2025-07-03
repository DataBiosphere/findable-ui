import { ToggleButton } from "@mui/material";
import React from "react";
import { TestIdProps } from "../../../../../../types";
import { VIEW_MODE } from "../../../hooks/UseEntityView/types";
import { ViewToggleProps } from "./types";
import { StyledToggleButtonGroup } from "./viewToggle.styles";

export const ViewToggle = ({
  onChange,
  testId,
  viewMode,
  viewStatus,
}: TestIdProps & ViewToggleProps): JSX.Element | null => {
  if (viewStatus.disabled) return null;
  return (
    <StyledToggleButtonGroup
      data-testid={testId}
      exclusive
      value={viewMode}
      onChange={onChange}
    >
      <ToggleButton value={VIEW_MODE.TABLE}>Table</ToggleButton>
      <ToggleButton value={VIEW_MODE.CHART}>Graph</ToggleButton>
    </StyledToggleButtonGroup>
  );
};

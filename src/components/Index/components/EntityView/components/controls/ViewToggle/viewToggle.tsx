import { ToggleButton } from "@mui/material";
import { JSX } from "react";
import { TestIdProps } from "../../../../../../types";
import { useEntityView } from "../../../context/hook";
import { VIEW_MODE } from "./hooks/UseViewToggle/types";
import { StyledToggleButtonGroup } from "./viewToggle.styles";

export const ViewToggle = ({ testId }: TestIdProps): JSX.Element | null => {
  const { onChange, viewMode, viewStatus } = useEntityView();

  if (viewStatus.disabled) return null;

  return (
    <StyledToggleButtonGroup
      data-testid={testId}
      exclusive
      onChange={onChange}
      value={viewMode}
    >
      <ToggleButton value={VIEW_MODE.TABLE}>Table</ToggleButton>
      <ToggleButton value={VIEW_MODE.CHART}>Graph</ToggleButton>
    </StyledToggleButtonGroup>
  );
};

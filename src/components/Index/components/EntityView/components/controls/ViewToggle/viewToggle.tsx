import { ToggleButton } from "@mui/material";
import { JSX } from "react";
import { TestIdProps } from "../../../../../../types";
import { useEntityView } from "../../../context/hook";
import { VIEW_MODE } from "./hooks/UseViewToggle/types";
import { StyledToggleButtonGroup } from "./viewToggle.styles";

/**
 * Toggle between the entity list's table and graph views, using the entity view context.
 * @param props - Component props.
 * @param props.testId - Test ID applied to the toggle button group.
 * @returns The view toggle, or null when the view status is disabled.
 */
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

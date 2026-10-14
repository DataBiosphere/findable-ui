import { ToggleButtonGroupProps } from "@mui/material";

export enum VIEW_MODE {
  CHART = "chart",
  TABLE = "table",
}

/**
 * Entity list view status.
 */
export interface ViewStatus {
  disabled: boolean;
}

/**
 * Return type for the useViewToggle hook.
 */
export interface UseViewToggleProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewMode: VIEW_MODE;
  viewStatus: ViewStatus;
}

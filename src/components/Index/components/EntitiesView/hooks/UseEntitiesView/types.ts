import { ToggleButtonGroupProps } from "@mui/material";

export enum VIEW_MODE {
  CHART = "chart",
  TABLE = "table",
}

export interface ViewStatus {
  disabled: boolean;
}

export interface UseEntitiesViewProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewMode: VIEW_MODE;
  viewStatus: ViewStatus;
}

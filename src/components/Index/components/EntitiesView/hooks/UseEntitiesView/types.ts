import { ToggleButtonGroupProps } from "@mui/material";

export interface ViewStatus {
  disabled: boolean;
  isTableView: boolean;
}

export enum VIEW_TYPE {
  FILTER = "filter",
  TABLE = "table",
}

export interface UseEntitiesViewProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewStatus: ViewStatus;
}

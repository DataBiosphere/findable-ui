import { ToggleButtonGroupProps } from "@mui/material";
import { VIEW_MODE, ViewStatus } from "../../../hooks/UseEntityView/types";

export interface ViewToggleProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewMode: VIEW_MODE;
  viewStatus: ViewStatus;
}

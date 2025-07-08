import { ToggleButtonGroupProps } from "@mui/material";
import {
  VIEW_MODE,
  ViewStatus,
} from "../components/controls/ViewToggle/hooks/UseViewToggle/types";

export interface EntityViewContextProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewMode: VIEW_MODE;
  viewStatus: ViewStatus;
}

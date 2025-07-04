import { ToggleButtonGroupProps } from "@mui/material";
import {
  VIEW_MODE,
  ViewStatus,
} from "../components/common/ViewToggle/hooks/UseViewToggle/types";

export interface EntityViewContextProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewMode: VIEW_MODE;
  viewStatus: ViewStatus;
}

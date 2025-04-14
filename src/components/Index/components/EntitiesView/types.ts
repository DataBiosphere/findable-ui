import { ToggleButtonGroupProps } from "@mui/material";
import { ChildrenProps } from "../../../types";
import { VIEW_MODE, ViewStatus } from "./hooks/UseEntitiesView/types";

export interface EntitiesViewProps extends ChildrenProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewMode: VIEW_MODE;
  viewStatus: ViewStatus;
}

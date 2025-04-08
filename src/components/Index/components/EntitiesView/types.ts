import { ToggleButtonGroupProps } from "@mui/material";
import { ChildrenProps, TestIdProps } from "../../../types";
import { VIEW_MODE, ViewStatus } from "./hooks/UseEntitiesView/types";

export interface EntitiesViewProps extends ChildrenProps, TestIdProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewMode: VIEW_MODE;
  viewStatus: ViewStatus;
}

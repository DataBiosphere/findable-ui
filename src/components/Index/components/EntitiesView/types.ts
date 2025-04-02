import { ToggleButtonGroupProps } from "@mui/material";
import { ChildrenProps } from "../../../types";
import { ViewStatus } from "./hooks/UseEntitiesView/types";

export interface EntitiesViewProps extends ChildrenProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewStatus: ViewStatus;
}

import { ToggleButtonGroupProps } from "@mui/material";
import { ChildrenProps, TestIdProps } from "../../../types";
import { ViewStatus } from "./hooks/UseEntitiesView/types";

export interface EntitiesViewProps extends ChildrenProps, TestIdProps {
  onChange: ToggleButtonGroupProps["onChange"];
  viewStatus: ViewStatus;
}

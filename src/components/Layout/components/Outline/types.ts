import { TabsProps } from "@mui/material";
import { ElementType } from "react";
import { BaseComponentProps } from "../../../types";
import { ContentsTabProps } from "./components/ContentsTab/types";

export interface OutlineItem {
  depth: number;
  disabled?: boolean;
  hash: string;
  value: string;
}

export interface OutlineProps extends BaseComponentProps, TabsProps {
  Contents: ElementType<ContentsTabProps>;
  outline?: OutlineItem[] | null;
}

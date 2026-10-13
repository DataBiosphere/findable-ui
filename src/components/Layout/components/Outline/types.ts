import { TabsProps } from "@mui/material";
import { ElementType } from "react";
import { BaseComponentProps } from "../../../types";
import { ContentsTabProps } from "./components/ContentsTab/types";

/**
 * An outline item, linking to a heading on the page.
 */
export interface OutlineItem {
  depth: number;
  disabled?: boolean;
  hash: string;
  value: string;
}

/**
 * Props for the Outline component.
 */
export interface OutlineProps extends BaseComponentProps, TabsProps {
  Contents: ElementType<ContentsTabProps>;
  outline?: OutlineItem[] | null;
}

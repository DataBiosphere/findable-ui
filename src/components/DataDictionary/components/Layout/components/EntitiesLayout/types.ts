import { CSSProperties, ReactNode } from "react";
import { LayoutSpacing } from "../../../../../../hooks/UseLayoutSpacing/types";

/**
 * Props for the EntitiesLayout component.
 */
export interface EntitiesLayoutProps {
  children: ReactNode;
  spacing: LayoutSpacing;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

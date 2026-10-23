import { CSSProperties, ReactNode } from "react";

/**
 * Props for the EntitiesLayout component.
 */
export interface EntitiesLayoutProps {
  children: ReactNode;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

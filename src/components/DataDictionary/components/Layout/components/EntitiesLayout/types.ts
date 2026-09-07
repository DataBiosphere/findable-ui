import { CSSProperties, ReactNode } from "react";

export interface EntitiesLayoutProps {
  children: ReactNode;
  /** Offsets the entities to clear the sticky filters. */
  spacing: EntitiesSpacing;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

export interface EntitiesSpacing {
  top: number;
}

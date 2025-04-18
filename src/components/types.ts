import { ReactNode } from "react";

export interface BaseComponentProps {
  className?: string;
}

export interface ChildrenProps {
  children?: ReactNode;
}

export interface ContentProps {
  content?: ReactNode;
}

export interface TrackingProps {
  trackingId?: string;
}

export interface TestIdProps {
  testId?: string;
}

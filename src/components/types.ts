import { ReactNode } from "react";

/**
 * Class name prop shared by components.
 */
export interface BaseComponentProps {
  className?: string;
}

/**
 * Children prop shared by components.
 */
export interface ChildrenProps {
  children?: ReactNode;
}

/**
 * Content prop shared by components.
 */
export interface ContentProps {
  content?: ReactNode;
}

/**
 * Tracking id prop shared by components.
 */
export interface TrackingProps {
  trackingId?: string;
}

/**
 * Test id prop shared by components.
 */
export interface TestIdProps {
  testId?: string;
}

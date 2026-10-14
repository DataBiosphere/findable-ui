/**
 * Space, in pixels, taken at the top and bottom of the layout.
 */
export interface LayoutSpacing {
  bottom: number;
  top: number;
}

/**
 * Return value of the useLayoutSpacing hook.
 */
export interface UseLayoutSpacing {
  spacing: LayoutSpacing;
}

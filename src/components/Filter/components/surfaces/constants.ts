import type { SurfaceProps } from "./types";

/**
 * Every `SurfaceProps` key. Typed as a record over `keyof SurfaceProps`, so a
 * field added to `SurfaceProps` is a compile error until it is listed here —
 * which is what keeps `isSurfaceProp` complete without anyone remembering to
 * update it.
 */
export const SURFACE_PROP_KEYS: Record<keyof SurfaceProps, true> = {
  categoryFilters: true,
  count: true,
  filterSort: true,
  filterSortEnabled: true,
  onFilter: true,
  onFilterSortChange: true,
};

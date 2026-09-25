import { SURFACE_PROP_KEYS } from "./constants";

/**
 * Returns whether a prop is one of the `SurfaceProps` the filter adapter hands
 * every surface. A surface built on a MUI component uses this to keep those
 * props from reaching the component, which would forward them to the DOM.
 * @param prop - Prop name.
 * @returns True if the prop is a `SurfaceProps` key.
 */
export function isSurfaceProp(prop: string): boolean {
  return Object.hasOwn(SURFACE_PROP_KEYS, prop);
}

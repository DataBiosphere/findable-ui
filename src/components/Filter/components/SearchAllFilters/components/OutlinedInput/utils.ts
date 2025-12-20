import { SURFACE_TYPE } from "../../../surfaces/types";

/**
 * Returns true if the clear button should display.
 * Displays always for popper drawer surface type when open.
 * Displays when there is a search term for other surface types when open.
 * @param surfaceType - Surface type.
 * @param searchTerm - Search term.
 * @param open - Autocomplete open state.
 * @returns True if the clear button should display.
 */
export function isButtonIn(
  surfaceType: SURFACE_TYPE,
  searchTerm: string,
  open: boolean,
): boolean {
  if (!open) return false;

  if (surfaceType === SURFACE_TYPE.POPPER_DRAWER) return true;

  return !!searchTerm;
}

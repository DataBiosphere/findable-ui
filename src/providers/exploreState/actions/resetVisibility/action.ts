import type { SiteConfig } from "../../../../config/entities";
import { ExploreState } from "../../../exploreState";
import { updateEntityPageState } from "../../utils";
import { buildInitialColumnVisibility } from "./utils";

/**
 * Reducer function to handle the "reset column visibility" action.
 * Resets the current entity's column visibility to its initial state, from the entity's config: the first column
 * visibility preset when it has presets. Grouped columns stay visible.
 * @param state - Explore State.
 * @param config - Site config.
 * @returns explore state.
 */
export function resetColumnVisibilityAction(
  state: ExploreState,
  config: SiteConfig,
): ExploreState {
  return {
    ...state,
    entityPageState: updateEntityPageState(
      state.tabValue,
      state.entityPageState,
      { columnVisibility: buildInitialColumnVisibility(state, config) },
    ),
  };
}

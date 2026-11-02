import type { VisibilityState } from "@tanstack/react-table";
import { getInitialColumnVisibilityState } from "../../../../components/TableCreator/options/initialState/columnVisibility";
import type { SiteConfig } from "../../../../config/entities";
import { getEntityConfig } from "../../../../config/utils";
import type { ExploreState } from "../../../exploreState";

/**
 * Returns the current entity's initial column visibility, from its config (the first column visibility preset when it
 * has presets), with any grouped columns kept visible.
 * @param state - Explore state.
 * @param config - Site config.
 * @returns Column visibility.
 */
export function buildInitialColumnVisibility(
  state: ExploreState,
  config: SiteConfig,
): VisibilityState {
  const { entityPageState, tabValue } = state;
  const { list } = getEntityConfig(config.entities, tabValue);
  const { grouping = [] } = entityPageState[tabValue];
  return {
    ...getInitialColumnVisibilityState(list.tableOptions),
    ...Object.fromEntries(grouping.map((id) => [id, true])),
  };
}

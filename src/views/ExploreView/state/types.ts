import { Dispatch } from "react";
import { ExploreViewAction } from "./actions/types";

/**
 * Entity identifier.
 */
export type EntityId = string;

/**
 * Per-entity view state tracking UI intent (e.g., preset selection).
 */
export interface EntityViewState {
  presetKey: string | null;
}

/**
 * State mapping entity list types to their view state.
 */
export type ExploreViewState = Record<EntityId, EntityViewState>;

/**
 * Context value for the ExploreView state provider.
 */
export interface ExploreViewContextValue {
  dispatch: Dispatch<ExploreViewAction>;
  state: ExploreViewState;
}

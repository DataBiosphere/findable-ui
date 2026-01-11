import { EntityViewState, ExploreViewState } from "./types";

/**
 * Default state for a single entity view.
 */
export const DEFAULT_ENTITY_VIEW_STATE: EntityViewState = {
  presetKey: null,
};

/**
 * Initial state for the explore view reducer.
 * Starts empty; entity states are lazily initialized on first access.
 */
export const INITIAL_STATE: ExploreViewState = {};

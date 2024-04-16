import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { HEADER_HEIGHT } from "../components/Layout/components/Header/common/constants";

// Default layout state.
export const DEFAULT_LAYOUT_STATE = {
  headerHeight: HEADER_HEIGHT + 1, // 1px for bottom border.
};

/**
 * Layout state.
 */
export type LayoutState = {
  headerHeight: number;
};

/**
 * Model of layout state context.
 */
export type LayoutStateContextProps = {
  layoutDispatch: Dispatch<LayoutAction>;
  layoutState: LayoutState;
};

export const LayoutStateContext = createContext<LayoutStateContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  layoutDispatch: () => {},
  layoutState: DEFAULT_LAYOUT_STATE,
});

export interface LayoutStateProps {
  children: ReactNode | ReactNode[];
}

export function LayoutStateProvider({
  children,
}: LayoutStateProps): JSX.Element {
  // Layout state.
  const [layoutState, layoutDispatch] = useReducer(
    (s: LayoutState, a: LayoutAction) => layoutReducer(s, a),
    DEFAULT_LAYOUT_STATE
  );
  return (
    <LayoutStateContext.Provider
      value={{
        layoutDispatch,
        layoutState,
      }}
    >
      {children}
    </LayoutStateContext.Provider>
  );
}

/**
 * Layout action kind.
 */
export enum LayoutActionKind {
  UpdateHeaderHeight = "UPDATE_HEADER_HEIGHT",
}

/**
 * Layout action.
 */
export type LayoutAction = UpdateHeaderHeightAction;

/**
 * Update header height action.
 */
type UpdateHeaderHeightAction = {
  payload?: number;
  type: LayoutActionKind.UpdateHeaderHeight;
};

/**
 * Layout reducer.
 * @param state - Layout state.
 * @param action - Layout action.
 * @returns layout state.
 */
function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  const { payload, type } = action;
  // eslint-disable-next-line sonarjs/no-small-switch -- allow small switch.
  switch (type) {
    // Updates header height.
    case LayoutActionKind.UpdateHeaderHeight: {
      return {
        ...state,
        headerHeight: payload ?? state.headerHeight,
      };
    }
    default:
      return state;
  }
}

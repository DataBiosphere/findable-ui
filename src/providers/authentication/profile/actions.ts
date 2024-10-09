import {
  ProfileState,
  RequestProfileErrorPayload,
  RequestProfileSuccessPayload,
  ResetProfilePayload,
} from "./types";

/**
 * Request profile action "success" or "error".
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function requestProfileAction<P>(
  state: ProfileState<P>,
  payload: RequestProfileSuccessPayload<P> | RequestProfileErrorPayload<P>
): ProfileState<P> {
  const { providerKey, providerValue } = payload;
  return {
    ...state,
    [providerKey]: providerValue,
  };
}

/**
 * Reset profile action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function resetProfileAction<P>(
  state: ProfileState<P>,
  payload: ResetProfilePayload
): ProfileState<P> {
  const { providerKey } = payload;
  return {
    ...state,
    [providerKey]: undefined,
  };
}

import {
  BaseProfile,
  ProfileActionKind,
  ProviderKey,
  ProviderValue,
  RequestProfileErrorAction,
  RequestProfileSuccessAction,
  ResetProfileAction,
  STATUS,
} from "./types";

/**
 * Request profile error action.
 * @param providerKey - Provider key.
 * @param providerValue - Provider value.
 * @returns Action.
 */
export function requestProfileError<P>(
  providerKey: ProviderKey,
  providerValue?: Pick<ProviderValue<P>, "profile"> & Partial<BaseProfile>
): RequestProfileErrorAction<P> {
  return {
    payload: {
      providerKey,
      providerValue: {
        status: STATUS.ERROR,
        ...providerValue,
        profile: providerValue?.profile,
      },
    },
    type: ProfileActionKind.RequestProfileErrorAction,
  };
}

/**
 * Request profile success action.
 * @param providerKey - Provider key.
 * @param providerValue - Provider value.
 * @returns Action.
 */
export function requestProfileSuccess<P>(
  providerKey: ProviderKey,
  providerValue: Pick<ProviderValue<P>, "profile"> & Partial<BaseProfile>
): RequestProfileSuccessAction<P> {
  return {
    payload: {
      providerKey,
      providerValue: {
        status: providerValue.profile ? STATUS.SUCCESS : STATUS.ERROR,
        ...providerValue,
      },
    },
    type: ProfileActionKind.RequestProfileSuccessAction,
  };
}

/**
 * Reset profile action.
 * @param providerKey - Provider key.
 * @returns Action.
 */
export function resetProfile(providerKey: ProviderKey): ResetProfileAction {
  return {
    payload: {
      providerKey,
    },
    type: ProfileActionKind.ResetProfileAction,
  };
}

import { useReducer } from "react";
import { DEFAULT_TOKEN_STATE } from "../../auth/constants/token";
import { tokenReducer } from "../../auth/reducers/token";
import { TokenContextProps } from "../../auth/types/token";

/**
 * Token reducer: Manages the internal state of the token within the OAuth provider.
 * This reducer handles the token locally until certain conditions are met.
 * For releasing the token to the rest of the app, use the credentials reducer.
 * @returns token context props.
 */
export const useTokenReducer = (): TokenContextProps => {
  const [tokenState, tokenDispatch] = useReducer(
    tokenReducer,
    undefined,
    () => DEFAULT_TOKEN_STATE,
  );
  return { tokenDispatch, tokenState };
};

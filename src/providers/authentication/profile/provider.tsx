import React, { useReducer } from "react";
import { ProfileContext } from "./context";
import { profileReducer } from "./reducer";
import {
  ProfileAction,
  ProfileContextProps,
  ProfileProviderProps,
  ProfileState,
} from "./types";

export function ProfileProvider<P>({
  children,
}: ProfileProviderProps): JSX.Element {
  const [profileState, profileDispatch] = useReducer(
    (s: ProfileState<P>, a: ProfileAction<P>) => profileReducer(s, a),
    {}
  );
  return (
    <ProfileContext.Provider
      value={
        {
          profileDispatch,
          profileState,
        } as ProfileContextProps<unknown>
      }
    >
      {children}
    </ProfileContext.Provider>
  );
}

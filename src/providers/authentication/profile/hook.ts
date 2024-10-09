import { Context, useContext } from "react";
import { ProfileContext } from "./context";
import { ProfileContextProps } from "./types";

/**
 * Profile hook.
 * @returns profile context.
 */
export const useProfile = <P>(): ProfileContextProps<P> => {
  return useContext<ProfileContextProps<P>>(
    ProfileContext as Context<ProfileContextProps<P>>
  );
};

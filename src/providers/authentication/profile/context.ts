import { createContext } from "react";
import { ProfileContextProps } from "./types";

export const ProfileContext = createContext<ProfileContextProps<unknown>>({
  profileDispatch: null,
  profileState: {},
});

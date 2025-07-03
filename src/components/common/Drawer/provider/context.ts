import { createContext } from "react";
import { DrawerContextProps } from "./types";

export const DrawerContext = createContext<DrawerContextProps>({
  onClose: () => {},
  onOpen: () => {},
  open: false,
});

import { createContext } from "react";
import { DrawerContextProps } from "./types";

export const DrawerContext = createContext<DrawerContextProps>({
  id: "",
  onClose: () => {},
  onOpen: () => {},
  open: false,
});

import { createContext } from "react";
import { PopperContextProps } from "./types";

export const PopperContext = createContext<PopperContextProps>({
  anchorEl: null,
  onClose: () => {},
  onOpen: () => {},
  open: false,
});

import { createContext } from "react";
import { VIEW_MODE } from "../components/controls/ViewToggle/hooks/UseViewToggle/types";
import { EntityViewContextProps } from "./types";

export const EntityViewContext = createContext<EntityViewContextProps>({
  onChange: () => {},
  viewMode: VIEW_MODE.TABLE,
  viewStatus: { disabled: false },
});

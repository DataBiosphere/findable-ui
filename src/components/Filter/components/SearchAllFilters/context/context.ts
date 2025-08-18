import { createContext } from "react";
import { SURFACE_TYPE } from "../../surfaces/types";
import { AutocompleteContextProps } from "./types";

export const AutocompleteContext = createContext<AutocompleteContextProps>({
  onClear: (): void => undefined,
  onFilter: (): void => undefined,
  open: false,
  searchTerm: "",
  selectCategoryViews: [],
  surfaceType: SURFACE_TYPE.POPPER_MENU,
});

import { createContext } from "react";
import { SURFACE_TYPE } from "../../surfaces/types";
import { AutocompleteContextProps } from "./types";

export const AutocompleteContext = createContext<AutocompleteContextProps>({
  filteredItems: [],
  highlightedIndex: -1,
  onClear: (): void => undefined,
  onFilter: (): void => undefined,
  open: false,
  optionIdPrefix: "",
  searchTerm: "",
  surfaceType: SURFACE_TYPE.POPPER_MENU,
});

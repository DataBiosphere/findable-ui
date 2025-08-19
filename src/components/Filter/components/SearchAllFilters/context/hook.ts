import { useContext } from "react";
import { AutocompleteContext } from "./context";
import { AutocompleteContextProps } from "./types";

/**
 * Returns autocomplete context.
 * @returns autocomplete context.
 */
export const useAutocomplete = (): AutocompleteContextProps => {
  return useContext(AutocompleteContext);
};

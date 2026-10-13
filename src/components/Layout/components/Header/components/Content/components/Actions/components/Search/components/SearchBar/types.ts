import type { UseSearchReturn } from "../../hooks/UseSearch/types";
import type { UseSubmitReturn } from "../../hooks/UseSubmit/types";

/**
 * Props for the SearchBar component.
 */
export interface SearchBarProps
  extends Pick<UseSearchReturn, "open">, Pick<UseSubmitReturn, "onSubmit"> {
  /** Owned by the Disclosure, so the button's aria-controls can target this bar. */
  id: string;
}

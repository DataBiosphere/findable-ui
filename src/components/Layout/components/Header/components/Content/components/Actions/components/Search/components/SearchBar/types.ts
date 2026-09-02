import { UseSearchReturn } from "../../hooks/UseSearch/types";
import { UseSubmitReturn } from "../../hooks/UseSubmit/types";

export interface SearchBarProps
  extends
    Pick<UseSearchReturn, "onClose" | "open">,
    Pick<UseSubmitReturn, "onSubmit"> {
  /** Owned by Search, so the button's aria-controls can target this bar. */
  id: string;
}

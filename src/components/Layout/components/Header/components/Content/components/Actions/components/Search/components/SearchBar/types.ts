import { UseSearchReturn } from "../../hooks/UseSearch/types";
import { UseSubmitReturn } from "../../hooks/UseSubmit/types";

export interface SearchBarProps
  extends
    Pick<UseSearchReturn, "onClose" | "open">,
    Pick<UseSubmitReturn, "onSubmit"> {}

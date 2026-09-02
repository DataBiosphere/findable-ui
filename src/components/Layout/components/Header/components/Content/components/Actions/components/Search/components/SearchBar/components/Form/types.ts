import { FormHTMLAttributes, Ref } from "react";
import { UseSubmitReturn } from "../../../../hooks/UseSubmit/types";

export interface FormProps
  extends
    Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
    Pick<UseSubmitReturn, "onSubmit"> {
  /** Forwarded to the form element; required by `ClickAwayListener`. */
  ref?: Ref<HTMLFormElement>;
}

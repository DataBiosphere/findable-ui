import { JSX } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { FormProps } from "./types";

/**
 * Renders the research form.
 * @param props - Component props.
 * @param props.actions - Form actions.
 * @param props.children - Form children.
 * @returns The research form container element.
 */
export const Form = ({ actions, children }: FormProps): JSX.Element => {
  return (
    <form data-testid={TEST_IDS.RESEARCH_FORM} onSubmit={actions.onSubmit}>
      {children}
    </form>
  );
};

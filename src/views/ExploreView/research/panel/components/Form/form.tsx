import { JSX } from "react";
import { TEST_IDS } from "../../../../../../tests/testIds";
import { FormProps } from "./types";

/**
 * Renders the research form.
 * @param props - Component props.
 * @param props.actions - Form actions.
 * @param props.children - Form children.
 * @param props.status - Form status.
 * @returns The research form container element.
 */
export const Form = ({ actions, children, status }: FormProps): JSX.Element => {
  return (
    <form
      data-testid={TEST_IDS.RESEARCH_FORM}
      onSubmit={(e) => {
        if (status.loading) return;
        actions.onSubmit(e);
      }}
    >
      {children}
    </form>
  );
};

import { JSX } from "react";
import { TEST_IDS } from "../../../../../tests/testIds";
import { useQuery } from "../../../state/query/hooks/UseQuery/hook";
import { FIELD_NAME } from "./constants";
import { StyledForm } from "./form.styles";
import { FormProps } from "./types";
import { getPayload } from "./utils";

/**
 * Renders the research form.
 * @param props - Component props.
 * @param props.children - Form children.
 * @param props.className - Class name for styling.
 * @param props.status - Form status.
 * @returns The research form container element.
 */
export const Form = ({
  children,
  className,
  status,
}: FormProps): JSX.Element => {
  const { onSubmit } = useQuery();
  return (
    <StyledForm
      className={className}
      data-testid={TEST_IDS.RESEARCH_FORM}
      onSubmit={async (e) => {
        await onSubmit(e, getPayload(e), {
          onSettled: (form) => {
            const input = form.elements.namedItem(FIELD_NAME.AI_PROMPT);
            if (input instanceof HTMLElement) input.focus();
          },
          status,
        });
      }}
    >
      {children}
    </StyledForm>
  );
};

import { JSX } from "react";
import { TEST_IDS } from "../../../../../tests/testIds";
import { useChatDispatch } from "../../../state/hooks/UseChatDispatch/hook";
import { MessageResponse } from "../../../state/types";
import { FIELD_NAME } from "./constants";
import { FormProps } from "./types";
import { getPayload } from "./utils";
import { StyledForm } from "./form.styles";

/**
 * Renders the research form.
 * @param props - Component props.
 * @param props.actions - Form actions.
 * @param props.children - Form children.
 * @param props.className - Class name for styling.
 * @param props.status - Form status.
 * @returns The research form container element.
 */
export const Form = ({
  actions,
  children,
  className,
  status,
}: FormProps): JSX.Element => {
  const dispatch = useChatDispatch();
  return (
    <StyledForm
      className={className}
      data-testid={TEST_IDS.RESEARCH_FORM}
      onSubmit={async (e) => {
        await actions.onSubmit(e, getPayload(e), {
          onError: (error) => {
            dispatch.onSetError(error.message);
          },
          onMutate: (form, query) => {
            dispatch.onSetQuery(query);
            dispatch.onSetStatus(true);
            form.reset();
          },
          onSettled: (form) => {
            dispatch.onSetStatus(false);
            const input = form.elements.namedItem(FIELD_NAME.AI_PROMPT);
            if (input instanceof HTMLElement) input.focus();
          },
          onSuccess: (data) => {
            dispatch.onSetMessage(data as MessageResponse);
          },
          status,
        });
      }}
    >
      {children}
    </StyledForm>
  );
};

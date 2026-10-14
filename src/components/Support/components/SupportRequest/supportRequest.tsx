import { JSX, useState } from "react";
import { FormDialog } from "./components/Dialog/dialog";
import { REQUEST_FIELD_ID } from "./components/SupportRequestForm/common/entities";
import { SupportRequestForm } from "./components/SupportRequestForm/supportRequestForm";
import { SupportRequestSubmitted } from "./components/SupportRequestSubmitted/supportRequestSubmitted";

/**
 * Support request config.
 */
export interface SupportRequest {
  FIELD_ID: Record<REQUEST_FIELD_ID, number>;
  requestURL: string;
  uploadURL: string;
}

/**
 * Props for the SupportRequest component.
 */
export interface SupportRequestProps {
  supportRequest: SupportRequest;
}

/**
 * Floating button that opens the support request form, then a confirmation once
 * the request is sent.
 * @param props - Component props.
 * @param props.supportRequest - Support request config.
 * @returns The support request button and form.
 */
export const SupportRequest = ({
  supportRequest,
}: SupportRequestProps): JSX.Element => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  return (
    <FormDialog setFormSubmitted={setFormSubmitted}>
      {formSubmitted ? (
        <SupportRequestSubmitted />
      ) : (
        <SupportRequestForm
          setFormSubmitted={setFormSubmitted}
          supportRequest={supportRequest}
        />
      )}
    </FormDialog>
  );
};

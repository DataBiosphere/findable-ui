import React, { useState } from "react";
import { FormDialog } from "./components/Dialog/dialog";
import { REQUEST_FIELD_ID } from "./components/SupportRequestForm/common/entities";
import { SupportRequestForm } from "./components/SupportRequestForm/supportRequestForm";
import { SupportRequestSubmitted } from "./components/SupportRequestSubmitted/supportRequestSubmitted";

export interface SupportRequest {
  FIELD_ID: Record<REQUEST_FIELD_ID, number>;
  requestURL: string;
  uploadURL: string;
}

export interface SupportRequestProps {
  supportRequest: SupportRequest;
}

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

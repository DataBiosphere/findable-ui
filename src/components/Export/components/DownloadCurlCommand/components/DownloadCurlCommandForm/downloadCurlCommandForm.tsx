import { Dispatch, JSX, SetStateAction } from "react";
import { ExecutionEnvironment, FormFacet } from "../../../../common/entities";
import { ExportButton } from "../../../ExportForm/components/ExportButton/exportButton";
import { ExportExecutionEnvironmentForm } from "../../../ExportForm/components/ExportExecutionEnvironmentForm/exportExecutionEnvironmentForm";
import {
  ExportForm,
  OnRequestManifestFn,
} from "../../../ExportForm/exportForm";
import { Button } from "./downloadCurlCommandForm.styles";

/**
 * Props for the DownloadCurlCommandForm component.
 */
export interface DownloadCurlCommandFormProps {
  executionEnvironment: ExecutionEnvironment;
  formFacet: FormFacet;
  isLoading: boolean;
  onRequestManifest: OnRequestManifestFn;
  setExecutionEnvironment: Dispatch<SetStateAction<ExecutionEnvironment>>;
}

/**
 * Export form for the curl command download: the species and file type
 * forms, a shell choice and a "Request curl Command" button.
 * @param props - Component props.
 * @param props.executionEnvironment - Selected shell.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.isLoading - Whether the form's facets are loading.
 * @param props.onRequestManifest - Invoked when the form is submitted with a species and file type selected.
 * @param props.setExecutionEnvironment - Sets the selected shell.
 * @returns The curl command form.
 */
export const DownloadCurlCommandForm = ({
  executionEnvironment,
  formFacet,
  isLoading,
  onRequestManifest,
  setExecutionEnvironment,
}: DownloadCurlCommandFormProps): JSX.Element => {
  return (
    <ExportForm
      Button={renderButton}
      formFacet={formFacet}
      isLoading={isLoading}
      onRequestManifest={onRequestManifest}
    >
      <ExportExecutionEnvironmentForm
        executionEnvironment={executionEnvironment}
        setExecutionEnvironment={setExecutionEnvironment}
      />
    </ExportForm>
  );
};

/**
 * Build the export button.
 * @param props - Button props e.g. "onClick" to request manifest.
 * @returns button element.
 */
function renderButton({ ...props }): JSX.Element {
  return (
    <ExportButton Button={Button} {...props}>
      Request curl Command
    </ExportButton>
  );
}

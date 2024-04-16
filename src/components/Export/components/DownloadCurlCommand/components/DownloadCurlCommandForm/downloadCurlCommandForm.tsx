import React, { Dispatch, SetStateAction } from "react";
import { ExecutionEnvironment, FormFacet } from "../../../../common/entities";
import { ExportButton } from "../../../ExportForm/components/ExportButton/exportButton";
import { ExportExecutionEnvironmentForm } from "../../../ExportForm/components/ExportExecutionEnvironmentForm/exportExecutionEnvironmentForm";
import {
  ExportForm,
  OnRequestManifestFn,
} from "../../../ExportForm/exportForm";
import { Button } from "./downloadCurlCommandForm.styles";

export interface DownloadCurlCommandFormProps {
  executionEnvironment: ExecutionEnvironment;
  formFacet: FormFacet;
  isLoading: boolean;
  onRequestManifest: OnRequestManifestFn;
  setExecutionEnvironment: Dispatch<SetStateAction<ExecutionEnvironment>>;
}

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

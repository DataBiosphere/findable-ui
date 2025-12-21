import { JSX, Dispatch, ElementType, SetStateAction } from "react";
import { FileManifestState } from "../../../../../../providers/fileManifestState";
import { PAPER_PANEL_STYLE } from "../../../../../common/Paper/paper";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Loading } from "../../../../../Loading/loading";
import { ExecutionEnvironment, FormFacet } from "../../../../common/entities";
import {
  Section,
  SectionContent,
  SectionFootnote,
} from "../../../../export.styles";

export interface DownloadCurlCommandNotStartedProps {
  DownloadCurlForm: ElementType;
  DownloadCurlStart: ElementType;
  executionEnvironment: ExecutionEnvironment;
  fileManifestState: FileManifestState;
  formFacet: FormFacet;
  isLoading: boolean;
  onRequestManifest: () => void;
  setExecutionEnvironment: Dispatch<SetStateAction<ExecutionEnvironment>>;
}

export const DownloadCurlCommandNotStarted = ({
  DownloadCurlForm,
  DownloadCurlStart,
  executionEnvironment,
  fileManifestState,
  formFacet,
  isLoading,
  onRequestManifest,
  setExecutionEnvironment,
}: DownloadCurlCommandNotStartedProps): JSX.Element => {
  return (
    <div>
      <Loading
        loading={isLoading}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
        text="Your curl command is being prepared..."
      />
      <FluidPaper>
        <Section>
          <SectionContent>
            <DownloadCurlStart />
          </SectionContent>
          <DownloadCurlForm
            executionEnvironment={executionEnvironment}
            formFacet={formFacet}
            isLoading={fileManifestState.isLoading}
            onRequestManifest={onRequestManifest}
            setExecutionEnvironment={setExecutionEnvironment}
          />
          <SectionFootnote>
            The generated curl command is compatible with the Bash shell on Mac
            and Linux systems, and the Command shell on Windows systems, and
            will remain valid for seven days.
          </SectionFootnote>
        </Section>
      </FluidPaper>
    </div>
  );
};

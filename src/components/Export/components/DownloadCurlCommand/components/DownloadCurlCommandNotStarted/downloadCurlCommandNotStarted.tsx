import { Dispatch, ElementType, JSX, SetStateAction } from "react";
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

/**
 * Props for the DownloadCurlCommandNotStarted component.
 */
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

/**
 * Curl command download before the command is ready: the start content, the
 * form and a footnote on shell compatibility, under a loading overlay while
 * the command is being prepared.
 * @param props - Component props.
 * @param props.DownloadCurlForm - Form component, rendered with the shell, facet and request props.
 * @param props.DownloadCurlStart - Content rendered above the form.
 * @param props.executionEnvironment - Selected shell.
 * @param props.fileManifestState - File manifest state; its loading flag is passed to the form.
 * @param props.formFacet - Species and file type facets for the form.
 * @param props.isLoading - Whether the curl command is being prepared; shows the loading overlay.
 * @param props.onRequestManifest - Invoked when the form requests the curl command.
 * @param props.setExecutionEnvironment - Sets the selected shell.
 * @returns The curl command form view.
 */
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

import { Button } from "@mui/material";
import { ElementType, JSX } from "react";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../../export.styles";
import { Code } from "./manifestDownloadReady.styles";

/**
 * Props for the ManifestDownloadReady component.
 */
export interface ManifestDownloadReadyProps {
  ManifestDownloadSuccess: ElementType;
  manifestURL: string;
}

/**
 * Manifest download once the manifest is ready: the success content, the
 * manifest URL as a code block and a "Download Manifest" button.
 * @param props - Component props.
 * @param props.ManifestDownloadSuccess - Content rendered above the URL.
 * @param props.manifestURL - Manifest URL.
 * @returns The ready manifest download view.
 */
export const ManifestDownloadReady = ({
  ManifestDownloadSuccess,
  manifestURL,
}: ManifestDownloadReadyProps): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <ManifestDownloadSuccess />
          <Code code={manifestURL} />
        </SectionContent>
        <SectionActions>
          <Button
            color="primary"
            download
            href={manifestURL}
            variant="contained"
          >
            Download Manifest
          </Button>
        </SectionActions>
      </Section>
    </FluidPaper>
  );
};

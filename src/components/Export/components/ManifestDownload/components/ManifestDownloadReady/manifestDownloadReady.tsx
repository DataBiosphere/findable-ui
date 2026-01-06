import { Button } from "@mui/material";
import { JSX, ElementType } from "react";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../../export.styles";
import { Code } from "./manifestDownloadReady.styles";

export interface ManifestDownloadReadyProps {
  ManifestDownloadSuccess: ElementType;
  manifestURL: string;
}

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

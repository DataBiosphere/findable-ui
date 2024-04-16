import React, { ElementType } from "react";
import { Code } from "../../../../../common/Code/code";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Section, SectionContent } from "../../../../export.styles";

export interface DownloadCurlCommandReadyProps {
  curlCommand: string;
  DownloadCurlSuccess: ElementType;
}

export const DownloadCurlCommandReady = ({
  curlCommand,
  DownloadCurlSuccess,
}: DownloadCurlCommandReadyProps): JSX.Element => {
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <DownloadCurlSuccess />
          <Code code={curlCommand} />
        </SectionContent>
      </Section>
    </FluidPaper>
  );
};

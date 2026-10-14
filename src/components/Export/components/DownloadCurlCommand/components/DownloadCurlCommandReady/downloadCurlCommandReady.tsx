import { ElementType, JSX } from "react";
import { Code } from "../../../../../common/Code/code";
import { FluidPaper } from "../../../../../common/Paper/paper.styles";
import { Section, SectionContent } from "../../../../export.styles";

/**
 * Props for the DownloadCurlCommandReady component.
 */
export interface DownloadCurlCommandReadyProps {
  curlCommand: string;
  DownloadCurlSuccess: ElementType;
}

/**
 * Curl command download once the command is ready: the success content and
 * the command as a code block.
 * @param props - Component props.
 * @param props.curlCommand - Curl command for the selected shell.
 * @param props.DownloadCurlSuccess - Content rendered above the command.
 * @returns The ready curl command view.
 */
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

import { Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useDownloadStatus } from "../../../../hooks/useDownloadStatus";
import { FluidPaper } from "../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../common/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../common/Section/section.styles";
import { ExportButton, SectionFootnote } from "./exportMethod.styles";
export interface ExportMethodProps {
  buttonLabel: string;
  description: ReactNode;
  footnote?: ReactNode;
  isAccessible?: boolean;
  route: string;
  title: string;
  trackingId?: string;
}

export const ExportMethod = ({
  buttonLabel,
  description,
  footnote,
  isAccessible = true,
  route,
  title,
  trackingId,
}: ExportMethodProps): JSX.Element => {
  const { disabled, message } = useDownloadStatus();
  return (
    <FluidPaper>
      <Section>
        <SectionContent>
          <SectionTitle title={title} />
          <Typography variant="text-body-400-2lines">{description}</Typography>
        </SectionContent>
        <SectionActions>
          <Tooltip arrow title={message}>
            <span>
              <Link href={route} legacyBehavior passHref>
                {trackingId ? (
                  <ExportButton
                    disabled={disabled || !isAccessible}
                    id={trackingId}
                  >
                    {buttonLabel}
                  </ExportButton>
                ) : (
                  <ExportButton disabled={disabled || !isAccessible}>
                    {buttonLabel}
                  </ExportButton>
                )}
              </Link>
            </span>
          </Tooltip>
        </SectionActions>
        {footnote && <SectionFootnote>{footnote}</SectionFootnote>}
      </Section>
    </FluidPaper>
  );
};

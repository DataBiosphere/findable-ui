import { Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { JSX, ReactNode } from "react";
import { useDownloadStatus } from "../../../../hooks/useDownloadStatus";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { FluidPaper } from "../../../common/Paper/paper.styles";
import { SectionTitle } from "../../../common/Section/components/SectionTitle/sectionTitle";
import {
  Section,
  SectionActions,
  SectionContent,
} from "../../../common/Section/section.styles";
import { TrackingProps } from "../../../types";
import { ExportButton } from "./exportMethod.styles";

export interface ExportMethodProps extends TrackingProps {
  buttonLabel: string;
  description: ReactNode;
  footnote?: ReactNode;
  isAccessible?: boolean;
  route: string;
  title: string;
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
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}>
            {description}
          </Typography>
        </SectionContent>
        <SectionActions>
          <Tooltip arrow title={message}>
            <span>
              <ExportButton
                component={Link}
                disabled={disabled || !isAccessible}
                href={route}
                id={trackingId}
              >
                {buttonLabel}
              </ExportButton>
            </span>
          </Tooltip>
        </SectionActions>
        {footnote && (
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            component="div"
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
          >
            {footnote}
          </Typography>
        )}
      </Section>
    </FluidPaper>
  );
};

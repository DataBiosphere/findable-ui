import { Divider, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useExploreState } from "../../hooks/useExploreState";
import { ExploreActionKind } from "../../providers/exploreState";
import { useLayoutDimensions } from "../../providers/layoutDimensions/hook";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { ButtonPrimary } from "../common/Button/components/ButtonPrimary/buttonPrimary";
import { AlertIcon } from "../common/CustomIcon/components/AlertIcon/alertIcon";
import { Grid } from "../common/Grid/grid";
import { RoundedPaper } from "../common/Paper/paper.styles";
import {
  SectionContent as Content,
  SectionActions,
} from "../common/Section/section.styles";
import { PRIORITY, StatusIcon } from "../common/StatusIcon/statusIcon";
import {
  Error as CustomError,
  ErrorCode,
  ErrorLayout,
  ErrorSection,
  SectionContent,
} from "./error.styles";

interface ErrorDetailSectionProps {
  detail: string;
  title: string;
}

const ErrorMessage = ({
  detail,
  title,
}: ErrorDetailSectionProps): JSX.Element => (
  <Content>
    <Typography
      component="h3"
      variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_LARGE_500}
    >
      {title}
    </Typography>
    <RoundedPaper>
      <ErrorCode>{detail}</ErrorCode>
    </RoundedPaper>
  </Content>
);

export interface ErrorProps {
  errorMessage?: string;
  onReset?: () => void;
  requestUrlMessage?: string;
  rootPath?: string;
}

export const Error = ({
  errorMessage,
  onReset,
  requestUrlMessage,
  rootPath,
}: ErrorProps): JSX.Element => {
  const { exploreDispatch } = useExploreState();
  const { dimensions } = useLayoutDimensions();

  const handleToHomePageClicked = (): void => {
    onReset?.();
    exploreDispatch({
      payload: "",
      type: ExploreActionKind.ResetState,
    });
  };

  return (
    <ErrorLayout offset={dimensions.header.height}>
      <CustomError>
        <ErrorSection>
          <StatusIcon priority={PRIORITY.HIGH} StatusIcon={AlertIcon} />
          <SectionContent>
            <Typography
              component="h1"
              variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_HEADING_XLARGE}
            >
              Error
            </Typography>
            <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_LARGE_400}>
              An error occurred processing your request
            </Typography>
          </SectionContent>
          {rootPath && (
            <SectionActions>
              <Link href={rootPath} legacyBehavior passHref>
                <ButtonPrimary
                  onClick={handleToHomePageClicked}
                  href="passHref"
                >
                  To Homepage
                </ButtonPrimary>
              </Link>
            </SectionActions>
          )}
        </ErrorSection>
        {(requestUrlMessage || errorMessage) && (
          <>
            <Divider />
            <Grid gridSx={{ gap: 6 }}>
              {requestUrlMessage && (
                <ErrorMessage detail={requestUrlMessage} title="Request URL" />
              )}
              {errorMessage && (
                <ErrorMessage detail={errorMessage} title="Error Message" />
              )}
            </Grid>
          </>
        )}
      </CustomError>
    </ErrorLayout>
  );
};

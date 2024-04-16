import { Divider, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useExploreState } from "../../hooks/useExploreState";
import { useLayoutState } from "../../hooks/useLayoutState";
import { ExploreActionKind } from "../../providers/exploreState";
import { ButtonPrimary } from "../common/Button/components/ButtonPrimary/buttonPrimary";
import { AlertIcon } from "../common/CustomIcon/components/AlertIcon/alertIcon";
import { Grid } from "../common/Grid/grid";
import { RoundedPaper } from "../common/Paper/paper.styles";
import {
  SectionActions,
  SectionContent as Content,
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
    <Typography component="h3" variant="text-body-large-500">
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
  const {
    layoutState: { headerHeight },
  } = useLayoutState();

  const handleToHomePageClicked = (): void => {
    onReset?.();
    exploreDispatch({
      payload: "",
      type: ExploreActionKind.ResetState,
    });
  };

  return (
    <ErrorLayout offset={headerHeight}>
      <CustomError>
        <ErrorSection>
          <StatusIcon priority={PRIORITY.HIGH} StatusIcon={AlertIcon} />
          <SectionContent>
            <Typography component="h1" variant="text-heading-xlarge">
              Error
            </Typography>
            <Typography variant="text-body-large-400">
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

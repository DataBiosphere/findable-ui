import { Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { useExploreState } from "../../hooks/useExploreState";
import { ExploreActionKind } from "../../providers/exploreState";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { BUTTON_PROPS } from "../common/Button/constants";
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

/**
 * Error detail with its title.
 * @param props - Component props.
 * @param props.detail - Detail.
 * @param props.title - Title.
 * @returns The error detail.
 */
const ErrorMessage = ({
  detail,
  title,
}: ErrorDetailSectionProps): JSX.Element => (
  <Content>
    <Typography
      component="h3"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
    >
      {title}
    </Typography>
    <RoundedPaper>
      <ErrorCode>{detail}</ErrorCode>
    </RoundedPaper>
  </Content>
);

/**
 * Props for the Error component.
 */
export interface ErrorProps {
  errorMessage?: string;
  onReset?: () => void;
  requestUrlMessage?: string;
  rootPath?: string;
}

/**
 * Error page, with the request URL and error message when given. "To Homepage"
 * resets the error and the explore state.
 * @param props - Component props.
 * @param props.errorMessage - Error message.
 * @param props.onReset - Clears the caught error.
 * @param props.requestUrlMessage - Request URL that failed.
 * @param props.rootPath - Homepage path; the "To Homepage" button renders only when given.
 * @returns The error page.
 */
export const Error = ({
  errorMessage,
  onReset,
  requestUrlMessage,
  rootPath,
}: ErrorProps): JSX.Element => {
  const { exploreDispatch } = useExploreState();

  const handleToHomePageClicked = (): void => {
    // Explicitly clear the caught error so recovery also works when "To
    // Homepage" targets the current route (rootPath === the current path),
    // where the ErrorBoundary's route-change reset would not fire. For
    // cross-route navigation the ErrorBoundary additionally resets on the
    // route change once navigation completes.
    onReset?.();
    exploreDispatch({
      payload: "",
      type: ExploreActionKind.ResetState,
    });
  };

  return (
    <ErrorLayout>
      <CustomError>
        <ErrorSection>
          <StatusIcon priority={PRIORITY.HIGH} StatusIcon={AlertIcon} />
          <SectionContent>
            <Typography
              component="h1"
              variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_XLARGE}
            >
              Error
            </Typography>
            <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}>
              An error occurred processing your request
            </Typography>
          </SectionContent>
          {rootPath && (
            <SectionActions>
              <Button
                {...BUTTON_PROPS.PRIMARY_CONTAINED}
                component={Link}
                href={rootPath}
                onClick={handleToHomePageClicked}
              >
                To Homepage
              </Button>
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

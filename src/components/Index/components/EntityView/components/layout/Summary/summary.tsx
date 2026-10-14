import { Typography } from "@mui/material";
import { Fragment, JSX } from "react";
import { useSummary } from "../../../../../../../hooks/useSummary";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../../../../tests/testIds";
import { BaseComponentProps } from "../../../../../../types";
import { GRID_PROPS } from "./constants";
import { StyledDot, StyledGrid } from "./summary.styles";

/**
 * Entity list summary: each summary's count and, when it has one, its label, separated by dots.
 * @param props - Component props.
 * @param props.className - Class name applied to the summary grid.
 * @returns The summary, or null when the summary is disabled, not configured, or not yet loaded.
 */
export const Summary = ({
  className,
}: BaseComponentProps): JSX.Element | null => {
  const { summaries } = useSummary() || {};

  if (!summaries) return null;

  return (
    <StyledGrid
      {...GRID_PROPS}
      className={className}
      data-testid={TEST_IDS.ENTITY_SUMMARY}
    >
      {summaries.map(([count, label], i) => (
        <Fragment key={i}>
          {i !== 0 && <StyledDot />}
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_500}>
            {count}
          </Typography>
          {label && (
            <Typography
              color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
              variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
            >
              {label}
            </Typography>
          )}
        </Fragment>
      ))}
    </StyledGrid>
  );
};

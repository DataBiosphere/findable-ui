import { Fade, Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../tests/testIds";

export interface PaginationSummaryProps {
  firstResult: number;
  lastResult: number;
  totalResult: number;
}

export const PaginationSummary = ({
  firstResult,
  lastResult,
  totalResult,
}: PaginationSummaryProps): JSX.Element => {
  return (
    <Fade in={totalResult > 0} unmountOnExit>
      <div data-testid={TEST_IDS.TABLE_PAGINATION_RESULTS}>
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400}>
          Results
        </Typography>
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_500}>
          {firstResult} - {lastResult}
        </Typography>
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400}>
          of
        </Typography>
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_500}>
          {totalResult}
        </Typography>
      </div>
    </Fade>
  );
};

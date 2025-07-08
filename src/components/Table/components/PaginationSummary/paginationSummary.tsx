import { Fade, Typography } from "@mui/material";
import React from "react";
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
        <Typography variant="text-body-400">Results </Typography>
        <Typography variant="text-body-small-500">
          {firstResult} - {lastResult}
        </Typography>
        <Typography variant="text-body-400"> of </Typography>
        <Typography variant="text-body-small-500">{totalResult}</Typography>
      </div>
    </Fade>
  );
};

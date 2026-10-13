import { Fade, Typography } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { TEST_IDS } from "../../../../tests/testIds";

/**
 * Props for the PaginationSummary component.
 */
export interface PaginationSummaryProps {
  firstResult: number;
  lastResult: number;
  totalResult: number;
}

/**
 * Pagination summary reading "Results X - Y of Z", fading in when the total result count is greater than zero and unmounting when it fades out.
 * @param props - Component props.
 * @param props.firstResult - Position of the first result on the page.
 * @param props.lastResult - Position of the last result on the page.
 * @param props.totalResult - Total number of results.
 * @returns The pagination summary.
 */
export const PaginationSummary = ({
  firstResult,
  lastResult,
  totalResult,
}: PaginationSummaryProps): JSX.Element => {
  return (
    <Fade in={totalResult > 0} unmountOnExit>
      <div data-testid={TEST_IDS.TABLE_PAGINATION_RESULTS}>
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
          Results
        </Typography>{" "}
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_500}>
          {firstResult} - {lastResult}
        </Typography>{" "}
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>of</Typography>{" "}
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_500}>
          {totalResult}
        </Typography>
      </div>
    </Fade>
  );
};

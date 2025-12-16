import { Stack } from "@mui/material";
import React from "react";
import { SVG_ICON_PROPS } from "../../../../../../../../styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";
import { ErrorIcon } from "../../../../../../../common/CustomIcon/components/ErrorIcon/errorIcon";
import { SuccessIcon } from "../../../../../../../common/CustomIcon/components/SuccessIcon/successIcon";
import { ResultSummarySection } from "./components/Tooltip/components/Title/title";
import { Tooltip } from "./components/Tooltip/tooltip";
import { StyledResultSummary } from "./resultSummary.styles";
import { ResultSummaryProps } from "./types";
import { renderSummary } from "./utils";

export const ResultSummary = ({
  summary,
}: ResultSummaryProps): JSX.Element | null => {
  if (!summary) return null;
  return (
    <Tooltip
      title={
        <Stack gap={4} useFlexGap>
          <ResultSummarySection
            icon={<SuccessIcon color={SVG_ICON_PROPS.COLOR.SUCCESS} />}
            mentionTermPair={summary.matched}
            title="Matched"
          />
          <ResultSummarySection
            icon={<ErrorIcon color={SVG_ICON_PROPS.COLOR.ALERT} />}
            mentionTermPair={summary.unmatched}
            title="Unmatched"
          />
        </Stack>
      }
    >
      {(ref) => (
        <StyledResultSummary
          ref={ref}
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
        >
          {renderSummary(summary)}
        </StyledResultSummary>
      )}
    </Tooltip>
  );
};

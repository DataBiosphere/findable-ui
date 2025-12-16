import { Stack, Typography } from "@mui/material";
import React from "react";
import { STACK_PROPS } from "../../../../../../../../../../../../styles/common/mui/stack";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../../../../styles/common/mui/typography";
import { ResultSummarySectionProps } from "./types";

export const ResultSummarySection = ({
  icon,
  mentionTermPair,
  title,
}: ResultSummarySectionProps): JSX.Element | null => {
  if (mentionTermPair.length === 0) return null;
  return (
    <Stack gap={2} useFlexGap>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}>
        {title}
      </Typography>
      {mentionTermPair.map(([mention, term]) => (
        <Stack
          key={`${mention}-${term}`}
          direction={STACK_PROPS.DIRECTION.ROW}
          spacing={1}
          useFlexGap
        >
          {icon}
          <span>{mention}</span>
          <Typography color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}>=</Typography>
          <span>{term}</span>
        </Stack>
      ))}
    </Stack>
  );
};

import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useSummary } from "../../../../../../hooks/useSummary";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { BaseComponentProps } from "../../../../../types";
import { GRID_PROPS } from "./constants";
import { StyledDot, StyledGrid } from "./summary.styles";

export const Summary = ({
  className,
}: BaseComponentProps): JSX.Element | null => {
  const { summaries } = useSummary() || {};

  if (!summaries) return null;

  return (
    <StyledGrid {...GRID_PROPS} className={className}>
      {summaries.map(([count, label], i) => (
        <Fragment key={i}>
          {i !== 0 && <StyledDot />}
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_500}>
            {count}
          </Typography>
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_400}
          >
            {label}
          </Typography>
        </Fragment>
      ))}
    </StyledGrid>
  );
};

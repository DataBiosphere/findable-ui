import { Typography } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import {
  TEXT_BODY_SMALL_400,
  TEXT_BODY_SMALL_500,
} from "../../../../../../theme/common/typography";
import { Dot, Summary } from "./summaries.styles";

export interface Summary {
  count: string;
  label: ReactNode;
}

export interface SummariesProps {
  summaries?: Summary[];
}

export const Summaries = ({ summaries }: SummariesProps): JSX.Element => {
  return (
    <>
      {summaries &&
        summaries.map(({ count, label }, c) => (
          <Fragment key={`${label}${c}`}>
            {c !== 0 && <Dot />}
            <Summary>
              <Typography variant={TEXT_BODY_SMALL_500}>{count}</Typography>
              <Typography color="ink.light" variant={TEXT_BODY_SMALL_400}>
                {label}
              </Typography>
            </Summary>
          </Fragment>
        ))}
    </>
  );
};

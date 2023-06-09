import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Dot } from "../../../../../common/Dot/dot";
import { Stack } from "../../../../../common/Stack/stack";

export interface Summary {
  count: string;
  label: string;
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
            <Stack direction="row" gap={1}>
              <Typography variant="text-body-small-500">{count}</Typography>
              <Typography color="ink.light" variant="text-body-small-400">
                {label}
              </Typography>
            </Stack>
          </Fragment>
        ))}
    </>
  );
};

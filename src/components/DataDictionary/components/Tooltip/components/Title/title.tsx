import { Stack, Typography } from "@mui/material";
import React from "react";
import { TEXT_BODY_LARGE_500 } from "../../../../../../theme/common/typography";
import { BaseComponentProps } from "../../../../../types";
import { STACK_PROPS, TYPOGRAPHY_PROPS } from "./constants";
import { TitleProps } from "./types";

export const Title = ({
  className,
  description,
  title,
}: BaseComponentProps & Required<TitleProps>): JSX.Element => {
  return (
    <Stack {...STACK_PROPS} className={className}>
      <Typography variant={TEXT_BODY_LARGE_500}>{title}</Typography>
      <Typography {...TYPOGRAPHY_PROPS}>{description}</Typography>
    </Stack>
  );
};

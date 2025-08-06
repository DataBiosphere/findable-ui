import { Stack, Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { BaseComponentProps } from "../../../../../types";
import { STACK_PROPS } from "./constants";
import { TitleProps } from "./types";

export const Title = ({
  className,
  description,
  title,
}: BaseComponentProps & Required<TitleProps>): JSX.Element => {
  return (
    <Stack {...STACK_PROPS} className={className}>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_LARGE_500}>
        {title}
      </Typography>
      <Typography color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT} component="div">
        {description}
      </Typography>
    </Stack>
  );
};

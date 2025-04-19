import { Stack, Typography } from "@mui/material";
import React from "react";
import { TYPOGRAPHY_PROPS as MUI_TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
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
      <Typography variant={MUI_TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}>
        {title}
      </Typography>
      <Typography {...TYPOGRAPHY_PROPS}>{description}</Typography>
    </Stack>
  );
};

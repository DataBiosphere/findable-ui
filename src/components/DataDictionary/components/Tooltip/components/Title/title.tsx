import { Stack, Typography } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../styles/common/mui/typography";
import { BaseComponentProps } from "../../../../../types";
import { STACK_PROPS } from "./constants";
import { TitleProps } from "./types";

/**
 * Data dictionary tooltip content: a title above its description.
 * @param props - Component props.
 * @param props.className - Class name applied to the stack.
 * @param props.description - Tooltip description.
 * @param props.title - Tooltip title.
 * @returns The tooltip title.
 */
export const Title = ({
  className,
  description,
  title,
}: BaseComponentProps & Required<TitleProps>): JSX.Element => {
  return (
    <Stack {...STACK_PROPS} className={className}>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}>
        {title}
      </Typography>
      <Typography color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT} component="div">
        {description}
      </Typography>
    </Stack>
  );
};

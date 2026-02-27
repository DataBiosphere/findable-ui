import { Typography } from "@mui/material";
import { JSX } from "react";
import { ErrorMessageProps } from "./types";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";

/**
 * Renders an error message.
 * @param props - Component props.
 * @param props.message - Error message.
 * @returns The error message element.
 */
export const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element => {
  return (
    <Typography
      color={TYPOGRAPHY_PROPS.COLOR.ERROR}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
    >
      {message.error}
    </Typography>
  );
};

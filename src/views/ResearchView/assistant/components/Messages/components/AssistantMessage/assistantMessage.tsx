import { Typography } from "@mui/material";
import { JSX } from "react";
import { AssistantMessageProps } from "./types";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";

/**
 * Renders an assistant message.
 * @param props - Component props.
 * @param props.message - Assistant message.
 * @returns The assistant message element.
 */
export const AssistantMessage = ({
  message,
}: AssistantMessageProps): JSX.Element => {
  return (
    <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
      {message.response.message}
    </Typography>
  );
};

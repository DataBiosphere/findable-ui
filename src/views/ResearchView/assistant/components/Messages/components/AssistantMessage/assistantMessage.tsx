import { Typography } from "@mui/material";
import { JSX } from "react";
import { AssistantMessageProps } from "./types";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";

/**
 * Renders an assistant message.
 * @param props - Component props.
 * @param props.message - Assistant message.
 * @returns The assistant message element, or null if there is no message.
 */
export const AssistantMessage = ({
  message,
}: AssistantMessageProps): JSX.Element | null => {
  if (!message.response.message) return null;
  return (
    <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
      {message.response.message}
    </Typography>
  );
};

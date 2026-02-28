import { Stack, Typography } from "@mui/material";
import { JSX } from "react";
import { PromptMessageProps } from "./types";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import { Chips } from "./components/Chips/chips";

/**
 * Renders a prompt message, and chip suggestions if present (and if it's the last message).
 * @param props - Component props.
 * @param props.isLast - Whether message is the last.
 * @param props.message - Prompt message.
 * @returns The prompt message element.
 */
export const PromptMessage = ({
  isLast,
  message,
}: PromptMessageProps): JSX.Element => {
  return (
    <Stack gap={4} useFlexGap>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
        {message.text}
      </Typography>
      {isLast && <Chips message={message} />}
    </Stack>
  );
};

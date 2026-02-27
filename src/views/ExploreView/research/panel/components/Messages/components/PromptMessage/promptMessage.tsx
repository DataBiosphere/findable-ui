import { Typography } from "@mui/material";
import { JSX } from "react";
import { PromptMessageProps } from "./types";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";

/**
 * Renders a prompt message.
 * @param props - Component props.
 * @param props.message - Prompt message.
 * @returns The prompt message element.
 */
export const PromptMessage = ({ message }: PromptMessageProps): JSX.Element => {
  return (
    <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
      {message.text}
    </Typography>
  );
};

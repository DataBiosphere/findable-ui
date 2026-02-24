import { Typography } from "@mui/material";
import { JSX } from "react";
import { UserMessageProps } from "./types";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";
import { StyledRoundedPaper } from "./useMessage.styles";

/**
 * Renders a user message.
 * @param props - Component props.
 * @param props.message - User message.
 * @returns The user message element.
 */
export const UserMessage = ({ message }: UserMessageProps): JSX.Element => {
  return (
    <StyledRoundedPaper elevation={0}>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
        {message.text}
      </Typography>
    </StyledRoundedPaper>
  );
};

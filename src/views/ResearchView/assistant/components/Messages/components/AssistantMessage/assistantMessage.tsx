import { Stack, Typography } from "@mui/material";
import { JSX } from "react";
import { AssistantMessageProps } from "./types";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import { getMappings, getMentions } from "./utils";

/**
 * Renders an assistant message.
 * @param props - Component props.
 * @param props.message - Assistant message.
 * @returns The assistant message element.
 */
export const AssistantMessage = ({
  message,
}: AssistantMessageProps): JSX.Element => {
  const mentions = getMentions(message);
  const mappings = getMappings(message);
  return (
    <Stack gap={2} useFlexGap>
      {message.response.message && (
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
          {message.response.message}
        </Typography>
      )}
      {mentions && (
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}>
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_500}
          >
            Extracted mentions:
          </Typography>{" "}
          {mentions}
        </Typography>
      )}
      {mappings && (
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}>
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_500}
          >
            Extracted mappings:
          </Typography>{" "}
          {mappings}
        </Typography>
      )}
    </Stack>
  );
};

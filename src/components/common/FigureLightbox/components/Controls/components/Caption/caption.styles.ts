import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { CAPTION_MAX_LINES } from "../../../../constants";

export const StyledCaptionText = styled(Typography)`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: ${CAPTION_MAX_LINES};
  overflow: hidden;
  // Chrome centres the clamped last line before adding the ellipsis, which can
  // then overflow by up to half its width and lose a dot to the clip; the
  // padding gives it room.
  padding: 0 0.5em;
` as typeof Typography;

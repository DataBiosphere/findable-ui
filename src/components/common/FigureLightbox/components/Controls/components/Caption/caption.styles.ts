import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { CAPTION_MAX_LINES } from "../../../../constants";

export const StyledCaptionText = styled(Typography)`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: ${CAPTION_MAX_LINES};
  overflow: hidden;
` as typeof Typography;

import { styled } from "@mui/material";
import { mediaTabletDown } from "../../styles/common/mixins/breakpoints";

export const PADDING_Y = 24;

export const View = styled("div")`
  display: grid;
  gap: 16px 24px;
  grid-template-columns: 242px 1fr;
  flex: 1;
  margin: 0 auto;
  max-width: min(calc(100vw - 48px), 1392px);
  padding: ${PADDING_Y}px 0;

  ${mediaTabletDown} {
    grid-template-columns: 1fr;
    max-width: calc(100vw - 32px);
  }
`;

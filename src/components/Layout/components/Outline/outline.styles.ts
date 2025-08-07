import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Tab as MTab, Tabs as MTabs, TabProps } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";

interface Props extends TabProps {
  depth: number;
}

export const tab = css`
  align-items: flex-start;
  margin: 0;
  max-width: unset;
  padding: 6px 24px;
  text-align: left;

  &:hover {
    text-decoration: none;
  }
`;

export const StyledTabs = styled(MTabs)`
  align-self: flex-start;
  box-shadow: inset 1px 0 ${PALETTE.SMOKE_MAIN};
  margin: 0;
  max-width: 242px;
  padding: 0;

  .MuiTabs-scroller {
    margin: 0;
  }

  .MuiTabs-flexContainer {
    gap: 0;
  }

  .MuiTabs-indicator {
    border-radius: 0 6px 6px 0;
    left: 0;
    width: 3px;
  }
`;

export const StyledTab = styled(MTab, {
  shouldForwardProp: (prop) => prop !== "depth",
})<Props>`
  ${tab};
  color: ${PALETTE.INK_MAIN};

  ${({ depth }) =>
    depth === 2 &&
    css`
      font: ${FONT.BODY_500};
    `};

  ${({ depth }) =>
    depth === 3 &&
    css`
      font: ${FONT.BODY_SMALL_400};
      margin-left: 16px;
      padding: 8px 24px;
    `};
`;

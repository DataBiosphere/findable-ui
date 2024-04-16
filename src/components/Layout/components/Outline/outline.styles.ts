import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Tab as MTab, TabProps, Tabs as MTabs } from "@mui/material";
import { smokeMain } from "../../../../styles/common/mixins/colors";
import {
  textBody500,
  textBodySmall400,
} from "../../../../styles/common/mixins/fonts";
import { inkMain } from "../../../../theme/common/palette";

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

export const Tabs = styled(MTabs)`
  align-self: flex-start;
  box-shadow: inset 1px 0 ${smokeMain};
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

export const Tab = styled(MTab, {
  shouldForwardProp: (prop) => prop !== "depth",
})<Props>`
  ${tab};
  color: ${inkMain};

  ${(props) =>
    props.depth === 2 &&
    css`
      ${textBody500(props)};
    `};

  ${(props) =>
    props.depth === 3 &&
    css`
      ${textBodySmall400(props)};
      margin-left: 16px;
      padding: 8px 24px;
    `};
`;

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { COLOR_MIXES } from "../../../styles/common/constants/colorMixes";
import { CSS } from "../../../styles/common/constants/css";
import { FONT } from "../../../styles/common/constants/font";
import { PALETTE } from "../../../styles/common/constants/palette";

interface Props {
  copied: boolean;
}

const copy = css`
  align-items: center;
  border-radius: inherit;
  color: ${PALETTE.COMMON_WHITE};
  content: "";
  display: flex;
  font: ${FONT.BODY_500};
  font-family: ${CSS.FONT_FAMILY};
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity 300ms;
  width: 100%;
`;

export const CodeBlock = styled("pre")<Props>`
  background-color: ${PALETTE.INFO_LIGHTEST};
  border-radius: 4px;
  cursor: pointer;
  margin: 16px 0;
  padding: 16px;
  position: relative;

  &::after {
    ${copy};
  }

  // Copy to Clipboard!
  ${({ copied }) =>
    !copied &&
    css`
      &:hover::after {
        background-color: ${COLOR_MIXES.PRIMARY_MAIN_90};
        content: "Copy to Clipboard";
        opacity: 1;
      }
    `};

  // Copied!
  ${({ copied }) =>
    copied &&
    css`
      &::after {
        background-color: ${PALETTE.PRIMARY_MAIN};
        content: "Copied!";
        opacity: 1;
      }
    `};
`;

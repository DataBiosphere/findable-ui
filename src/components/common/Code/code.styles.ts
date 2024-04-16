import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { textBody500 } from "../../../styles/common/mixins/fonts";
import { ThemeProps } from "../../../theme/theme";

interface Props {
  copied: boolean;
}

const copy = (props: ThemeProps) => css`
  ${textBody500(props)};
  align-items: center;
  border-radius: inherit;
  color: ${props.theme.palette.common.white};
  content: "";
  display: flex;
  font-family: ${props.theme.typography.fontFamily};
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity ${props.theme.transitions.duration.standard}ms;
  width: 100%;
`;

export const CodeBlock = styled("pre")<Props>`
  background-color: ${({ theme }) => theme.palette.info.lightest};
  border-radius: 4px;
  cursor: pointer;
  margin: 16px 0;
  padding: 16px;
  position: relative;

  &::after {
    ${copy};
  }

  // Copy to Clipboard!
  ${({ copied, theme }) =>
    !copied &&
    css`
      &:hover::after {
        background-color: ${theme.palette.primary.main}e6;
        content: "Copy to Clipboard";
        opacity: 1;
      }
    `};

  // Copied!
  ${({ copied, theme }) =>
    copied &&
    css`
      &::after {
        background-color: ${theme.palette.primary.main};
        content: "Copied!";
        opacity: 1;
      }
    `};
`;

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import {
  errorMain,
  infoLightest,
  infoMain,
  inkMain,
  smokeDark,
  smokeLight,
} from "../../../../../styles/common/mixins/colors";

interface Props {
  isAttached: boolean;
  isDragActive: boolean;
  isError: boolean;
}

export const Button = styled(ButtonBase, {
  shouldForwardProp: (prop) =>
    prop !== "isAttached" && prop !== "isDragActive" && prop !== "isError",
})<Props>`
  align-items: center;
  background-color: ${smokeLight};
  border: 1px dashed ${smokeDark};
  border-radius: 4px;
  display: flex;
  gap: 8px;
  height: 40px;
  justify-content: ${(props) =>
    props.isAttached ? "space-between" : undefined};
  padding: 10px 12px;

  // Drag active.
  ${({ isDragActive, theme }) =>
    isDragActive &&
    css`
      background-color: ${infoLightest({ theme })};
      border: 1px dashed ${infoMain({ theme })};
    `};

  // Error.
  ${({ isDragActive, isError, theme }) =>
    isError &&
    !isDragActive &&
    css`
      border: 1px dashed ${errorMain({ theme })};
    `};

  .MuiTypography-text-body-400 {
    color: ${inkMain};
    opacity: 0.8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Underline = styled.span`
  text-decoration: underline;
  text-underline-offset: 2px;
`;

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";

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
  background-color: ${PALETTE.SMOKE_LIGHT};
  border: 1px dashed ${PALETTE.SMOKE_DARK};
  border-radius: 4px;
  display: flex;
  gap: 8px;
  height: 40px;
  justify-content: ${(props) =>
    props.isAttached ? "space-between" : undefined};
  padding: 10px 12px;

  // Drag active.
  ${({ isDragActive }) =>
    isDragActive &&
    css`
      background-color: ${PALETTE.INFO_LIGHTEST};
      border: 1px dashed ${PALETTE.INFO_MAIN};
    `};

  // Error.
  ${({ isDragActive, isError }) =>
    isError &&
    !isDragActive &&
    css`
      border: 1px dashed ${PALETTE.ERROR_MAIN};
    `};

  .MuiTypography-body-400 {
    color: ${PALETTE.INK_MAIN};
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

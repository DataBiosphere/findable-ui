import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../../styles/common/constants/palette";
import { PRIORITY, Priority } from "./statusIcon";

interface Props {
  priority: Priority;
}

export const StatusCircle = styled.div<Props>`
  border-radius: 50%;
  box-sizing: content-box;
  display: grid;
  height: 72px;
  place-content: center center;
  width: 72px;

  // Normal priority.
  ${({ priority }) =>
    priority === PRIORITY.NORMAL &&
    css`
      background-color: ${PALETTE.INFO_LIGHTEST};
      color: ${PALETTE.INFO_MAIN};
    `};

  // Low priority.
  ${({ priority }) =>
    priority === PRIORITY.LOW &&
    css`
      background-color: ${PALETTE.WARNING_LIGHTEST};
      color: ${PALETTE.WARNING_MAIN};
    `};

  // Medium priority.
  ${({ priority }) =>
    priority === PRIORITY.MEDIUM &&
    css`
      background-color: ${PALETTE.WARNING_LIGHT};
      border: 3px solid white;
      color: ${PALETTE.WARNING_MAIN};
    `};

  // High priority.
  ${({ priority }) =>
    priority === PRIORITY.HIGH &&
    css`
      background-color: ${PALETTE.ALERT_LIGHT};
      border: 3px solid white;
      color: ${PALETTE.ALERT_MAIN};
    `};
`;

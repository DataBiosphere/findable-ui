import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PALETTE } from "../../../styles/common/constants/palette";
import { ICON_BADGE_COLOR, IconBadgeColor } from "./iconBadge";

interface Props {
  color: IconBadgeColor;
}

export const Circle = styled.div<Props>`
  border-radius: 50%;
  box-sizing: content-box;
  display: grid;
  height: 72px;
  place-content: center center;
  width: 72px;

  // Alert.
  ${({ color }) =>
    color === ICON_BADGE_COLOR.ALERT &&
    css`
      background-color: ${PALETTE.ALERT_LIGHTEST};
      color: ${PALETTE.ALERT_MAIN};
    `};

  // Info.
  ${({ color }) =>
    color === ICON_BADGE_COLOR.INFO &&
    css`
      background-color: ${PALETTE.INFO_LIGHTEST};
      color: ${PALETTE.INFO_MAIN};
    `};

  // Success.
  ${({ color }) =>
    color === ICON_BADGE_COLOR.SUCCESS &&
    css`
      background-color: ${PALETTE.SUCCESS_LIGHTEST};
      color: ${PALETTE.SUCCESS_MAIN};
    `};

  // Warning.
  ${({ color }) =>
    color === ICON_BADGE_COLOR.WARNING &&
    css`
      background-color: ${PALETTE.WARNING_LIGHTEST};
      color: ${PALETTE.WARNING_MAIN};
    `};
`;

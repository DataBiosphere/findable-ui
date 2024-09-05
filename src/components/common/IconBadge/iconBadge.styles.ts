import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  alertLightest,
  alertMain,
  infoLightest,
  infoMain,
  successLightest,
  successMain,
  warningLightest,
  warningMain,
} from "../../../styles/common/mixins/colors";
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
  ${({ color, ...props }) =>
    color === ICON_BADGE_COLOR.ALERT &&
    css`
      background-color: ${alertLightest(props)};
      color: ${alertMain(props)};
    `};

  // Info.
  ${({ color, ...props }) =>
    color === ICON_BADGE_COLOR.INFO &&
    css`
      background-color: ${infoLightest(props)};
      color: ${infoMain(props)};
    `};

  // Success.
  ${({ color, ...props }) =>
    color === ICON_BADGE_COLOR.SUCCESS &&
    css`
      background-color: ${successLightest(props)};
      color: ${successMain(props)};
    `};

  // Warning.
  ${({ color, ...props }) =>
    color === ICON_BADGE_COLOR.WARNING &&
    css`
      background-color: ${warningLightest(props)};
      color: ${warningMain(props)};
    `};
`;

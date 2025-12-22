import { JSX, ElementType } from "react";
import { Circle } from "./iconBadge.styles";

/**
 * Model of icon badge color.
 */
export type IconBadgeColor = ICON_BADGE_COLOR;

export enum ICON_BADGE_COLOR {
  ALERT = "alert",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export interface IconBadgeProps {
  color: IconBadgeColor;
  Icon: ElementType;
  iconSize?: string;
}

export const IconBadge = ({
  color,
  Icon,
  iconSize = "xxlarge",
}: IconBadgeProps): JSX.Element => {
  return (
    <Circle color={color}>
      <Icon fontSize={iconSize} />
    </Circle>
  );
};

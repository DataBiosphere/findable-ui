import { ElementType, JSX } from "react";
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

/**
 * Props for the IconBadge component.
 */
export interface IconBadgeProps {
  color: IconBadgeColor;
  Icon: ElementType;
  iconSize?: string;
}

/**
 * Renders the given icon inside a circle of the given color.
 * @param props - Component props.
 * @param props.color - Badge color.
 * @param props.Icon - Icon component.
 * @param props.iconSize - Icon font size; defaults to "xxlarge".
 * @returns The icon badge.
 */
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

import {
  ChipProps as MChipProps,
  Fade as MFade,
  FadeProps as MFadeProps,
} from "@mui/material";
import { JSX } from "react";
import { StatusBadge } from "../../../common/StatusBadge/statusBadge";

const DEFAULT_FADE_PROPS: Partial<MFadeProps> = {
  appear: false,
  in: true,
};

/**
 * Props for the AccessibilityBadge component.
 */
export interface AccessibilityBadgeProps {
  badgeProps: Partial<Omit<MChipProps, "children">>;
  className?: string;
  fadeProps?: Partial<Omit<MFadeProps, "children">>;
}

/**
 * Status badge for the entity's accessibility, inside a fade transition.
 * @param props - Component props.
 * @param props.badgeProps - Props for the status badge.
 * @param props.className - Class name applied to the badge.
 * @param props.fadeProps - Props for the fade. Defaults to shown, without a transition on first render.
 * @returns The accessibility badge.
 */
export const AccessibilityBadge = ({
  badgeProps,
  className,
  fadeProps = DEFAULT_FADE_PROPS,
}: AccessibilityBadgeProps): JSX.Element => {
  return (
    <MFade {...fadeProps}>
      <StatusBadge className={className} {...badgeProps} />
    </MFade>
  );
};

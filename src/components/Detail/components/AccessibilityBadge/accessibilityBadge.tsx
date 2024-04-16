import {
  ChipProps as MChipProps,
  Fade as MFade,
  FadeProps as MFadeProps,
} from "@mui/material";
import React from "react";
import { StatusBadge } from "../../../common/StatusBadge/statusBadge";

const DEFAULT_FADE_PROPS: Partial<MFadeProps> = {
  appear: false,
  in: true,
};

export interface AccessibilityBadgeProps {
  badgeProps: Partial<Omit<MChipProps, "children">>;
  className?: string;
  fadeProps?: Partial<Omit<MFadeProps, "children">>;
}

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

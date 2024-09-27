import { ButtonProps } from "@mui/material";
import NLink from "next/link";
import React, { ElementType } from "react";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";
import { ButtonPrimary } from "../ButtonPrimary/buttonPrimary";

export interface CallToAction {
  label: string;
  target?: ANCHOR_TARGET;
  url: string;
}

export interface CallToActionButtonProps {
  ButtonElType?: ElementType;
  buttonProps?: Partial<ButtonProps>;
  callToAction: CallToAction;
  className?: string;
  disabled?: boolean;
}

export const CallToActionButton = ({
  ButtonElType: Button = ButtonPrimary,
  buttonProps,
  callToAction,
  className,
  disabled = false,
}: CallToActionButtonProps): JSX.Element => {
  const { label, target, url } = callToAction;
  const isInternal = isClientSideNavigation(url);
  return isInternal ? (
    <NLink href={url} legacyBehavior passHref>
      <Button
        className={className}
        disabled={disabled}
        href="passHref"
        rel={REL_ATTRIBUTE.NO_OPENER}
        target={target || ANCHOR_TARGET.SELF}
        {...buttonProps}
      >
        {label}
      </Button>
    </NLink>
  ) : (
    <Button
      className={className}
      disabled={disabled}
      href={url}
      rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
      target={target || ANCHOR_TARGET.BLANK}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

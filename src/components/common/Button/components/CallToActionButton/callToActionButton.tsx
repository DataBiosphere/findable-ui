import NLink from "next/link";
import React, { ElementType } from "react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";
import { ButtonPrimary } from "../ButtonPrimary/buttonPrimary";

export interface CallToAction {
  label: string;
  target?: ANCHOR_TARGET;
  url: string;
}

export interface CallToActionButtonProps {
  ButtonElType?: ElementType;
  callToAction: CallToAction;
  className?: string;
  disabled?: boolean;
}

export const CallToActionButton = ({
  ButtonElType: Button = ButtonPrimary,
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
        rel="noopener"
        target={target || ANCHOR_TARGET.SELF}
      >
        {label}
      </Button>
    </NLink>
  ) : (
    <Button
      className={className}
      disabled={disabled}
      href={url}
      rel="noopener noreferrer"
      target={target || ANCHOR_TARGET.BLANK}
    >
      {label}
    </Button>
  );
};

import NLink from "next/link";
import React from "react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { ButtonPrimary } from "../../button.styles";

export interface CallToAction {
  label: string;
  target: ANCHOR_TARGET;
  url: string;
}

export interface CallToActionButtonProps {
  callToAction: CallToAction;
  className?: string;
}

export const CallToActionButton = ({
  callToAction,
  className,
}: CallToActionButtonProps): JSX.Element => {
  const { label, target, url } = callToAction;
  return (
    <NLink href={url} passHref>
      <ButtonPrimary
        className={className}
        href="passHref"
        rel="noopener"
        target={target}
      >
        {label}
      </ButtonPrimary>
    </NLink>
  );
};

import { ButtonProps } from "@mui/material";
import Link from "next/link";
import { ElementType, JSX } from "react";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";
import { ButtonPrimary } from "../ButtonPrimary/buttonPrimary";

/**
 * A call to action, with its label, link target and url.
 */
export interface CallToAction {
  label: string;
  target?: ANCHOR_TARGET;
  url: string;
}

/**
 * Props for the CallToActionButton component.
 */
export interface CallToActionButtonProps {
  ButtonElType?: ElementType;
  buttonProps?: Partial<ButtonProps>;
  callToAction: CallToAction;
  className?: string;
  disabled?: boolean;
}

/**
 * Call to action button, linking to the call to action url.
 * Internal urls use client-side navigation and open in the same tab by default; external urls open in a new tab by default.
 * @param props - Component props.
 * @param props.ButtonElType - Button component to render; defaults to ButtonPrimary.
 * @param props.buttonProps - Props passed to the button.
 * @param props.callToAction - Call to action label, target and url.
 * @param props.className - Class name applied to the button.
 * @param props.disabled - Whether the button is disabled; defaults to false.
 * @returns The call to action button.
 */
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
    <Button
      className={className}
      component={Link}
      disabled={disabled}
      href={url}
      rel={REL_ATTRIBUTE.NO_OPENER}
      target={target || ANCHOR_TARGET.SELF}
      {...buttonProps}
    >
      {label}
    </Button>
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

import { SvgIconProps } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { resolveAriaLabel } from "../../../../../utils/ariaLabel";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";
import { HelpIcon } from "../../../CustomIcon/components/HelpIcon/helpIcon";
import { ARIA_LABEL } from "./constants";
import { HelpIconButton as Button } from "./helpIconButton.styles";

export interface HelpIconButtonProps {
  label?: string; // Accessible name for the link. Override when a page renders more than one help link, so each says what it helps with e.g. "Help with file formats"; a missing or blank value falls back to ARIA_LABEL.HELP.
  size?: SvgIconProps["fontSize"]; // Icon font size. Defaults to "small".
  target?: ANCHOR_TARGET;
  url: string;
}

export const HelpIconButton = ({
  label,
  size = "small",
  target,
  url,
}: HelpIconButtonProps): JSX.Element => {
  const isInternal = isClientSideNavigation(url);
  // The HelpIcon is aria-hidden (MUI sets that on every SvgIcon), so the link
  // needs an explicit accessible name.
  const ariaLabel = resolveAriaLabel(label, ARIA_LABEL.HELP);
  return isInternal ? (
    <Button
      aria-label={ariaLabel}
      component={Link}
      href={url}
      rel={REL_ATTRIBUTE.NO_OPENER}
      target={target || ANCHOR_TARGET.SELF}
    >
      <HelpIcon fontSize={size} />
    </Button>
  ) : (
    <Button
      aria-label={ariaLabel}
      href={url}
      rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
      target={target || ANCHOR_TARGET.BLANK}
    >
      <HelpIcon fontSize={size} />
    </Button>
  );
};

import { SvgIconProps } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { isClientSideNavigation } from "../../../../Links/common/utils";
import { HelpIcon } from "../../../CustomIcon/components/HelpIcon/helpIcon";
import { HelpIconButton as Button } from "./helpIconButton.styles";

export interface HelpIconButtonProps {
  size?: SvgIconProps["fontSize"]; // Icon font size. Defaults to "small".
  target?: ANCHOR_TARGET;
  url: string;
}

export const HelpIconButton = ({
  size = "small",
  target,
  url,
}: HelpIconButtonProps): JSX.Element => {
  const isInternal = isClientSideNavigation(url);
  return isInternal ? (
    <Link href={url} legacyBehavior passHref>
      <Button
        href="passHref"
        rel="noopener"
        target={target || ANCHOR_TARGET.SELF}
      >
        <HelpIcon fontSize={size} />
      </Button>
    </Link>
  ) : (
    <Button
      href={url}
      rel="noopener noreferrer"
      target={target || ANCHOR_TARGET.BLANK}
    >
      <HelpIcon fontSize={size} />
    </Button>
  );
};

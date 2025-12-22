import { SvgIconProps } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../Links/common/entities";
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
    <Button
      component={Link}
      href={url}
      rel={REL_ATTRIBUTE.NO_OPENER}
      target={target || ANCHOR_TARGET.SELF}
    >
      <HelpIcon fontSize={size} />
    </Button>
  ) : (
    <Button
      href={url}
      rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
      target={target || ANCHOR_TARGET.BLANK}
    >
      <HelpIcon fontSize={size} />
    </Button>
  );
};

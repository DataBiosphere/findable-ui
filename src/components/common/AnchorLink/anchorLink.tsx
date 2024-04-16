import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import React from "react";
import { AnchorLink as Link } from "./anchorLink.styles";

interface AnchorLinkProps {
  anchorLink: string;
  className?: string;
}

export const AnchorLink = ({
  anchorLink,
  className,
}: AnchorLinkProps): JSX.Element => {
  return (
    <Link aria-label={anchorLink} className={className} href={`#${anchorLink}`}>
      <LinkRoundedIcon fontSize="xsmall" />
    </Link>
  );
};

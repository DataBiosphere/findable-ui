import { LinkRounded } from "@mui/icons-material";
import React from "react";
import { StyledNextLink } from "./anchorLink.styles";

/**
 * An anchor link component that provides deep linking functionality.
 * @important The parent element must have `position: relative` CSS property
 * to ensure proper positioning of the anchor link icon, and hover pseudo-class
 * to change opacity of the icon.
 */

interface AnchorLinkProps {
  anchorLink: string;
  className?: string;
}

export const AnchorLink = ({
  anchorLink,
  className,
}: AnchorLinkProps): JSX.Element => {
  return (
    <StyledNextLink
      aria-label={anchorLink}
      className={className}
      href={`/#${anchorLink}`}
    >
      <LinkRounded fontSize="xsmall" />
    </StyledNextLink>
  );
};

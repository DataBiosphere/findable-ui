import { LinkRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
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
  const { query } = useRouter();
  return (
    <StyledNextLink
      aria-label={anchorLink}
      className={className}
      href={{ hash: anchorLink, query }}
    >
      <LinkRounded fontSize="xsmall" />
    </StyledNextLink>
  );
};

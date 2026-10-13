import { LinkRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import { JSX, MouseEvent } from "react";
import { StyledNextLink } from "./anchorLink.styles";

interface AnchorLinkProps {
  anchorLink: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

/**
 * An anchor link component that provides deep linking functionality.
 * @important The parent element must have `position: relative` CSS property
 * to ensure proper positioning of the anchor link icon, and hover pseudo-class
 * to change opacity of the icon.
 * @param props - Component props.
 * @param props.anchorLink - Anchor (hash) to link to, also used as the link's accessible name.
 * @param props.className - Class name applied to the link.
 * @param props.onClick - Function invoked when the link is clicked.
 * @returns The anchor link.
 */
export const AnchorLink = ({
  anchorLink,
  className,
  onClick,
}: AnchorLinkProps): JSX.Element => {
  const { query } = useRouter();
  return (
    <StyledNextLink
      aria-label={anchorLink}
      className={className}
      href={{ hash: anchorLink, query }}
      onClick={onClick}
    >
      <LinkRounded fontSize="xsmall" />
    </StyledNextLink>
  );
};

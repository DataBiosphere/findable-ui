import { LinkRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import { JSX, MouseEvent } from "react";
import { StyledNextLink } from "./anchorLink.styles";
import { getAriaLabel } from "./utils";

/**
 * Props for the AnchorLink component.
 */
export interface AnchorLinkProps {
  anchorLink: string;
  className?: string;
  label?: string;
  onClick?: (e: MouseEvent) => void;
}

/**
 * An anchor link component that provides deep linking functionality.
 * @important The parent element must have `position: relative` CSS property
 * to ensure proper positioning of the anchor link icon, and hover pseudo-class
 * to change opacity of the icon.
 * @param props - Component props.
 * @param props.anchorLink - Anchor (hash) to link to.
 * @param props.className - Class name applied to the link.
 * @param props.label - Title of the section linked to; the link's accessible name is "Link to" the title, or "Link to this section" when it is absent or blank.
 * @param props.onClick - Function invoked when the link is clicked.
 * @returns The anchor link.
 */
export const AnchorLink = ({
  anchorLink,
  className,
  label,
  onClick,
}: AnchorLinkProps): JSX.Element => {
  const { query } = useRouter();
  return (
    <StyledNextLink
      aria-label={getAriaLabel(label)}
      className={className}
      href={{ hash: anchorLink, query }}
      onClick={onClick}
    >
      <LinkRounded fontSize="xsmall" />
    </StyledNextLink>
  );
};

import { IconButtonProps as MIconButtonProps } from "@mui/material";
import { CSSProperties, ElementType, forwardRef, JSX, ReactNode } from "react";
import { ANCHOR_TARGET, REL_ATTRIBUTE } from "../../Links/common/entities";
import {
  IconButton as StyledIconButton,
  Socials as StyledSocials,
} from "./socials.styles";
import { getSocialLabel } from "./utils";

/**
 * Social link configuration.
 */
export interface Social {
  Icon: ElementType;
  label: ReactNode;
  url: string;
}

/**
 * Props for the Socials component.
 */
export interface SocialsProps {
  buttonSize?: MIconButtonProps["size"];
  className?: string;
  IconButton?: ElementType;
  socials: Social[];
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

/**
 * Row of social links, each an icon button that opens the social URL in a new tab.
 * @param props - Component props.
 * @param props.buttonSize - Size of each icon button; defaults to "medium".
 * @param props.className - Class name applied to the container.
 * @param props.IconButton - Component rendered for each social link; defaults to the styled icon button.
 * @param props.socials - Social links.
 * @param props.style - Style applied to the container.
 * @param ref - Ref forwarded to the container element.
 * @returns The social links.
 */
export const Socials = forwardRef<HTMLDivElement, SocialsProps>(
  function Socials(
    {
      buttonSize = "medium",
      className,
      // Bound as SocialLink: it renders a link (href), and the jsx-a11y
      // components map treats IconButton as a button.
      IconButton: SocialLink = StyledIconButton,
      socials,
      style,
    }: SocialsProps,
    ref,
  ): JSX.Element {
    return (
      <StyledSocials className={className} ref={ref} style={style}>
        {socials.map(({ Icon, label, url }, i) => (
          <SocialLink
            key={i}
            aria-label={getSocialLabel(label, url)}
            href={url}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            size={buttonSize}
            target={ANCHOR_TARGET.BLANK}
          >
            <Icon fontSize="small" />
          </SocialLink>
        ))}
      </StyledSocials>
    );
  },
);

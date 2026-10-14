import { JSX } from "react";
import { resolveAriaLabel } from "../../../../utils/ariaLabel";
import { ContactSupportIcon } from "../../../common/CustomIcon/components/ContactSupportIcon/contactSupportIcon";
import { ANCHOR_TARGET, REL_ATTRIBUTE } from "../../../Links/common/entities";
import { ARIA_LABEL } from "./constants";
import { ViewSupportProps } from "./types";
import { FabLink } from "./viewSupport.styles";

/**
 * View support button component.
 * Navigates to support URL provided.
 * @param props - Component props; other props are passed to the link.
 * @param props.className - Class name applied to the link.
 * @param props.Icon - Icon. Defaults to the contact support icon.
 * @param props.rel - Link rel. Defaults to noopener noreferrer.
 * @param props.target - Link target. Defaults to a new tab.
 * @param props.url - Support URL.
 * @returns The view support link.
 */
export const ViewSupport = ({
  className,
  Icon = ContactSupportIcon,
  rel = REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
  target = ANCHOR_TARGET.BLANK,
  url,
  ...props /* AnchorHTMLAttributes<HTMLAnchorElement> */
}: ViewSupportProps): JSX.Element => {
  return (
    <FabLink
      className={className}
      href={url}
      rel={rel}
      target={target}
      {...props}
      // Applied after the spread so a consumer can rename the link. A missing or
      // blank label falls back to the default, since a blank aria-label would be
      // ignored and leave the icon-only link unnamed.
      aria-label={resolveAriaLabel(
        props["aria-label"],
        ARIA_LABEL.CONTACT_SUPPORT,
      )}
    >
      <Icon fontSize="inherit" />
    </FabLink>
  );
};

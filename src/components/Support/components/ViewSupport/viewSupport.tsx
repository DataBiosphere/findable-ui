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
      // Applied after the spread so a consumer can rename the link but not blank
      // it: a blank aria-label is discarded, leaving the icon-only link unnamed.
      aria-label={resolveAriaLabel(
        props["aria-label"],
        ARIA_LABEL.CONTACT_SUPPORT,
      )}
    >
      <Icon fontSize="inherit" />
    </FabLink>
  );
};

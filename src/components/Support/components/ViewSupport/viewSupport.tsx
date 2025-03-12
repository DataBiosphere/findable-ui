import React from "react";
import { ContactSupportIcon } from "../../../common/CustomIcon/components/ContactSupportIcon/contactSupportIcon";
import { ANCHOR_TARGET, REL_ATTRIBUTE } from "../../../Links/common/entities";
import { ViewSupportProps } from "./types";
import { Fab } from "./viewSupport.styles";

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
    <Fab className={className} href={url} rel={rel} target={target} {...props}>
      <Icon fontSize="inherit" />
    </Fab>
  );
};

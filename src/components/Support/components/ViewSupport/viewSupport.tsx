import React, { ElementType } from "react";
import { ContactSupportIcon } from "../../../common/CustomIcon/components/ContactSupportIcon/contactSupportIcon";
import { ANCHOR_TARGET } from "../../../Links/common/entities";
import { Fab } from "./viewSupport.styles";

/**
 * View support button component.
 * Navigates to support URL provided.
 */

export interface ViewSupportProps {
  className?: string;
  Icon?: ElementType;
  target?: ANCHOR_TARGET;
  url: string;
}

export const ViewSupport = ({
  className,
  Icon = ContactSupportIcon,
  target = ANCHOR_TARGET.BLANK,
  url,
}: ViewSupportProps): JSX.Element => {
  return (
    <Fab className={className} href={url} target={target}>
      <Icon fontSize="inherit" />
    </Fab>
  );
};

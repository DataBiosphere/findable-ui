import React, { ReactElement } from "react";
import { Tooltip } from "./components/Tooltip/tooltip";

export interface NTagProps {
  className?: string;
  Tag: ReactElement;
  TooltipTitle: ReactElement;
}

/**
 * @deprecated - use NTag from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/NTagCell/components/NTag/nTag"
 */

export const NTag = ({
  className,
  Tag,
  TooltipTitle,
  ...props /* Spread props to allow for Mui Tooltip specific prop overrides. */
}: NTagProps): JSX.Element => {
  return (
    <Tooltip className={className} title={TooltipTitle} {...props}>
      {Tag}
    </Tooltip>
  );
};

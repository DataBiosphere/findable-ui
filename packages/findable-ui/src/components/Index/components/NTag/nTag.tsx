import { Tooltip } from "@mui/material";
import React, { ReactElement } from "react";

export interface NTagProps {
  Tag: ReactElement;
  TooltipTitle: ReactElement;
}

export const NTag = ({ Tag, TooltipTitle }: NTagProps): JSX.Element => {
  return (
    <Tooltip arrow placement="top" title={TooltipTitle}>
      {Tag}
    </Tooltip>
  );
};

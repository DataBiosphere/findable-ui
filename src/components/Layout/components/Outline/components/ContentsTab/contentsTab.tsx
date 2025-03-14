import React from "react";
import { Segment } from "../../../../../common/CustomIcon/components/Segment/segment";
import { StyledTab } from "./contentsTab.styles";
import { ContentsTabProps } from "./types";

export const ContentsTab = ({
  className,
  value,
  ...props /* MuiTabProps. */
}: ContentsTabProps): JSX.Element => {
  return (
    <StyledTab
      className={className}
      label="Contents"
      icon={<Segment fontSize="small" />}
      iconPosition="start"
      value={value}
      {...props}
    />
  );
};

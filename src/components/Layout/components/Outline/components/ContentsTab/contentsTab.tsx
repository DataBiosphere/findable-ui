import { TabProps as MTabProps } from "@mui/material";
import React from "react";
import { Segment } from "../../../../../common/CustomIcon/components/Segment/segment";
import { Tab } from "./contentsTab.styles";

export interface ContentsTabProps extends Omit<MTabProps, "value"> {
  className?: string;
  value: string;
}

export const ContentsTab = ({
  className,
  value,
  ...props /* Spread props to allow for Mui Tab specific prop overrides. */
}: ContentsTabProps): JSX.Element => {
  return (
    <Tab
      className={className}
      label="Contents"
      icon={<Segment fontSize="small" />}
      iconPosition="start"
      value={value}
      {...props}
    />
  );
};

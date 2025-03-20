import React from "react";
import { FONT_SIZE } from "../../../../../../styles/common/mui/icon";
import { TAB_PROPS } from "../../../../../../styles/common/mui/tab";
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
      icon={<Segment fontSize={FONT_SIZE.SMALL} />}
      iconPosition={TAB_PROPS.ICON_POSITION.START}
      value={value}
      {...props}
    />
  );
};

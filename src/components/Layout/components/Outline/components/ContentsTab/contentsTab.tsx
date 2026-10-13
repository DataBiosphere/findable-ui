import { JSX } from "react";
import { FONT_SIZE } from "../../../../../../styles/common/mui/icon";
import { TAB_PROPS } from "../../../../../../styles/common/mui/tab";
import { Segment } from "../../../../../common/CustomIcon/components/Segment/segment";
import { StyledTab } from "./contentsTab.styles";
import { ContentsTabProps } from "./types";

/**
 * "Contents" tab, with a segment icon at the start.
 * @param props - Component props.
 * @param props.className - Class name applied to the tab.
 * @param props.value - Tab value.
 * @returns The contents tab.
 */
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

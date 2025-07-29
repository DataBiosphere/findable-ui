import { FilterListRounded } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { SVG_ICON_PROPS } from "../../../../../../styles/common/mui/svgIcon";
import { BUTTON_PROPS } from "../../../../../common/Button/constants";
import { useDrawer } from "../../../../../common/Drawer/provider/hook";
import { BaseComponentProps } from "../../../../../types";
import { FilterCountChip } from "../../../FilterCountChip/filterCountChip";
import { FilterCountChipProps } from "../../../FilterCountChip/types";

export const FilterButton = ({
  className,
  count = 0,
  ...props
}: BaseComponentProps &
  ButtonProps &
  Pick<FilterCountChipProps, "count">): JSX.Element => {
  const { onOpen } = useDrawer();
  return (
    <Button
      {...BUTTON_PROPS.SECONDARY_CONTAINED}
      className={className}
      onClick={onOpen}
      startIcon={
        <FilterListRounded
          color={SVG_ICON_PROPS.COLOR.INK_LIGHT}
          fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL}
        />
      }
      {...props}
    >
      Filter
      <FilterCountChip count={count} />
    </Button>
  );
};

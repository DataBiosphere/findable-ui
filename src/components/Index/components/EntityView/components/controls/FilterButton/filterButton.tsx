import { FilterListRounded } from "@mui/icons-material";
import { ButtonProps, NoSsr } from "@mui/material";
import React from "react";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";
import { BUTTON_PROPS } from "../../../../../../common/Button/constants";
import { useDrawer } from "../../../../../../common/Drawer/provider/hook";
import { FilterCountChip } from "../../../../../../Filter/components/FilterCountChip/filterCountChip";
import { BaseComponentProps } from "../../../../../../types";
import { StyledButton } from "./filterButton.styles";

export const FilterButton = ({
  className,
  ...props
}: BaseComponentProps & ButtonProps): JSX.Element => {
  const { onOpen } = useDrawer();
  const { exploreState } = useExploreState();
  const { filterCount } = exploreState;
  return (
    <NoSsr>
      <StyledButton
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
        {/* NoSsr prevents server/client hydration mismatch with dynamic chip content */}
        <FilterCountChip count={filterCount} />
      </StyledButton>
    </NoSsr>
  );
};

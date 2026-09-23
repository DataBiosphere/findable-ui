import { FilterListRounded } from "@mui/icons-material";
import { ButtonProps, Button as MButton } from "@mui/material";
import { JSX } from "react";
import { SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";
import {
  getPopupAriaProps,
  HAS_POPUP,
} from "../../../../../../../utils/ariaPopup";
import { BUTTON_PROPS } from "../../../../../../common/Button/constants";
import { useDrawer } from "../../../../../../common/Drawer/provider/hook";
import { BaseComponentProps } from "../../../../../../types";
import { FilterCountChip } from "../../../../FilterCountChip/filterCountChip";
import { FilterCountChipProps } from "../../../../FilterCountChip/types";

/**
 * Opens facet-filters drawer.
 */

export const Button = ({
  className,
  count = 0,
  ...props
}: BaseComponentProps &
  ButtonProps &
  Pick<FilterCountChipProps, "count">): JSX.Element => {
  const { id, onOpen, open } = useDrawer();
  return (
    <MButton
      {...getPopupAriaProps({
        // A consumer can disable the trigger through ButtonProps; a disabled
        // trigger announces no expanded state for a drawer it cannot open.
        disabled: props.disabled,
        hasPopup: HAS_POPUP.DIALOG,
        id,
        open,
      })}
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
    </MButton>
  );
};

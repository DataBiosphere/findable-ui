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
 * "Filter" button that opens the filters drawer, showing the filter count and announcing the drawer as a dialog popup.
 * The given Mui Button props override the defaults, including the click handler.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @param props.count - Filter count; defaults to 0, which hides the count.
 * @returns The filter button.
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

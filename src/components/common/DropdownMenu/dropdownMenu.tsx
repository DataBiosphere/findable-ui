import { MenuProps as MMenuProps } from "@mui/material";
import { Fragment, JSX } from "react";
import {
  getMenuSlotProps,
  getPopupAriaProps,
  HAS_POPUP,
} from "../../../utils/ariaPopup";
import { useMenu } from "../Menu/hooks/useMenu";
import { DEFAULT_DROPDOWN_MENU_PROPS } from "./common/constants";
import {
  DropdownMenuButtonKey,
  DropdownMenuButtonProps,
  DropdownMenuIconButtonProps,
  DropdownMenuItemProps,
} from "./common/entities";
import { StyledMenu } from "./dropdownMenu.styles";

export interface DropdownMenuProps extends Omit<
  MMenuProps,
  "children" | "open"
> {
  /**
   * Renders the control that opens the menu. The props handed in carry the ARIA
   * state the control has to announce alongside `onClick` and `open`, because
   * only DropdownMenu knows the menu's id and open state — spread them onto the
   * rendered button.
   */
  button: (
    props:
      | Pick<DropdownMenuButtonProps, DropdownMenuButtonKey>
      | Pick<DropdownMenuIconButtonProps, DropdownMenuButtonKey>,
  ) => JSX.Element;
  children?: ({ closeMenu }: DropdownMenuItemProps) => JSX.Element[];
  className?: string;
}

export const DropdownMenu = ({
  button,
  children,
  className,
  slotProps,
  ...props /* Spread props to allow for Mui Menu specific prop overrides e.g. "anchorOrigin". */
}: DropdownMenuProps): JSX.Element => {
  const {
    anchorEl,
    id: menuId,
    onClose: closeMenu,
    onOpen: openMenu,
    open,
  } = useMenu<HTMLButtonElement>();
  return (
    <Fragment>
      {button({
        ...getPopupAriaProps({ hasPopup: HAS_POPUP.MENU, id: menuId, open }),
        onClick: openMenu,
        open,
      })}
      <StyledMenu
        {...DEFAULT_DROPDOWN_MENU_PROPS}
        anchorEl={anchorEl}
        className={className}
        onClose={closeMenu}
        open={open}
        {...props}
        slotProps={getMenuSlotProps(
          menuId,
          DEFAULT_DROPDOWN_MENU_PROPS.slotProps,
          slotProps,
        )}
      >
        {children ? children({ closeMenu }) : null}
      </StyledMenu>
    </Fragment>
  );
};

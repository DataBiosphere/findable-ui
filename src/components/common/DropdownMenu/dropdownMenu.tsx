import { MenuProps as MMenuProps } from "@mui/material";
import { Fragment, JSX } from "react";
import { useMenu } from "../Menu/hooks/useMenu";
import { DEFAULT_DROPDOWN_MENU_PROPS } from "./common/constants";
import {
  DropdownMenuButtonKey,
  DropdownMenuButtonProps,
  DropdownMenuIconButtonProps,
  DropdownMenuItemProps,
} from "./common/entities";
import { StyledMenu } from "./dropdownMenu.styles";

/**
 * Props for the DropdownMenu component.
 */
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
  /**
   * Whether the control that opens the menu is disabled. Set it here rather
   * than on the rendered button: DropdownMenu then hands `disabled` to the
   * `button` render prop and omits the expanded state a disabled control
   * cannot offer. When unset, no `disabled` is handed over, so a button that
   * sets its own is not overridden.
   */
  disabled?: boolean;
}

/**
 * Renders a control, via the `button` render prop, that opens a menu of the items built by `children`.
 * @param props - Component props.
 * @param props.button - Renders the control that opens the menu, given its ARIA, disabled, onClick and open props.
 * @param props.children - Builds the menu items, given a function that closes the menu.
 * @param props.className - Class name applied to the menu.
 * @param props.disabled - Whether the control that opens the menu is disabled.
 * @param props.MenuListProps - Deprecated Mui menu list props, merged into the menu's slot props.
 * @param props.PaperProps - Deprecated Mui paper props, merged into the menu's slot props.
 * @param props.slotProps - Mui menu slot props, merged with the default dropdown menu slot props.
 * @param props.TransitionProps - Deprecated Mui transition props, merged into the menu's slot props.
 * @returns The menu control and the menu.
 */
export const DropdownMenu = ({
  button,
  children,
  className,
  disabled,
  MenuListProps,
  PaperProps,
  slotProps,
  TransitionProps,
  ...props /* Spread props to allow for Mui Menu specific prop overrides e.g. "anchorOrigin". */
}: DropdownMenuProps): JSX.Element => {
  const {
    anchorEl,
    getSlotProps,
    onClose: closeMenu,
    onOpen: openMenu,
    open,
    triggerProps,
  } = useMenu<HTMLButtonElement>({ disabled });
  return (
    <Fragment>
      {button({
        ...triggerProps,
        ...(disabled === undefined ? {} : { disabled }),
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
        slotProps={getSlotProps(DEFAULT_DROPDOWN_MENU_PROPS.slotProps, {
          MenuListProps,
          PaperProps,
          TransitionProps,
          slotProps,
        })}
      >
        {children ? children({ closeMenu }) : null}
      </StyledMenu>
    </Fragment>
  );
};

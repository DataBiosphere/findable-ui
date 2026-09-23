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

import type { KeyboardEventHandler } from "react";
import type { PopupAriaProps } from "../../../../../../../../../../utils/ariaPopup";
import { closeAndRestoreFocus } from "../../../../../../../../../../utils/focus";
import type { OpenProps, TriggerProps } from "./types";

/**
 * Menu items that can take focus: MUI marks a disabled menu item with aria-disabled.
 */
const ENABLED_MENU_ITEM_SELECTOR =
  '[role="menuitem"]:not([aria-disabled="true"])';

/**
 * Moves focus to the menu's first enabled item as the menu opens, without scrolling the page.
 * The list's own autoFocusItem can't do this: it only reaches the list's direct children, and the items sit inside NavigationMenuItems.
 * A submenu renders in its own popper, so only this menu's items are searched.
 * @param menu - The opening menu's paper.
 */
export function focusFirstMenuItem(menu: HTMLElement): void {
  menu
    .querySelector<HTMLElement>(ENABLED_MENU_ITEM_SELECTOR)
    ?.focus({ preventScroll: true });
}

/**
 * Returns the handler for choosing a menu item: closes the menu and its ancestors, and the top-level menu returns focus to its nav button.
 * @param isSubMenu - Whether the menu is nested within another menu.
 * @param anchorEl - The element that opened the menu.
 * @param onClose - Function to close the menu.
 * @param closeAncestor - Function to close the ancestor menu.
 * @returns Close handler, for the menu items.
 */
export function getCloseMenuHandler(
  isSubMenu: boolean,
  anchorEl: HTMLElement | null,
  onClose: () => void,
  closeAncestor?: () => void,
): () => void {
  return () => {
    if (isSubMenu) onClose();
    else closeAndRestoreFocus(onClose, anchorEl);
    closeAncestor?.();
  };
}

/**
 * Returns the handler for when the menu has opened: a top-level menu locks page scroll; a submenu leaves that to the top-level menu.
 * @param isSubMenu - Whether the menu is nested within another menu.
 * @param onEnableScrollLock - Function to lock page scroll.
 * @returns Entered handler, for the menu's transition.
 */
export function getEnteredHandler(
  isSubMenu: boolean,
  onEnableScrollLock: () => void,
): () => void {
  return () => {
    if (isSubMenu) return;
    onEnableScrollLock();
  };
}

/**
 * Returns the menu list's keydown handler, adding to the list's own arrow key, Home, End and type-ahead handling.
 * Escape closes the menu and returns focus to the element that opened it, leaving any parent menu open.
 * Tab closes every menu and returns focus to the top-level nav button.
 * @param isSubMenu - Whether the menu is nested within another menu.
 * @param anchorEl - The element that opened the menu.
 * @param onClose - Function to close the menu.
 * @returns Keydown handler, for the menu list.
 */
export function getMenuListKeyDownHandler(
  isSubMenu: boolean,
  anchorEl: HTMLElement | null,
  onClose: () => void,
): KeyboardEventHandler<HTMLElement> {
  return (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeAndRestoreFocus(onClose, anchorEl);
      return;
    }
    if (event.key === "Tab") {
      // A submenu closes itself and lets the key reach the parent menu.
      if (isSubMenu) {
        onClose();
        return;
      }
      event.preventDefault();
      closeAndRestoreFocus(onClose, anchorEl);
      return;
    }
    // Through the portal, the parent menu's list would otherwise also move focus.
    if (isSubMenu) event.stopPropagation();
  };
}

/**
 * Returns a click handler that only runs for clicks that start in the element it is on. The submenu renders in a portal but is the item's React child, so a click on a submenu item reaches the item too, and would reopen the submenu it just closed.
 * @param onClick - Click handler.
 * @returns Click handler, for the submenu's item.
 */
function getOwnClickHandler(
  onClick: OpenProps["onClick"],
): OpenProps["onClick"] {
  return (event) => {
    if (!event.currentTarget.contains(event.target as Node)) return;
    onClick(event);
  };
}

/**
 * Returns the props that open the menu. A top-level menu opens from its nav button. A submenu opens from the menu item around its button, which is what the parent menu's arrow keys focus, so the item takes the props and the button leaves the tab order.
 * @param isSubMenu - Whether the menu is nested within another menu.
 * @param ariaProps - ARIA props describing the menu.
 * @param onOpen - Function to open the menu.
 * @returns Props for the nav button and the menu item around it.
 */
export function getTriggerProps(
  isSubMenu: boolean,
  ariaProps: PopupAriaProps,
  onOpen: OpenProps["onClick"],
): TriggerProps {
  if (!isSubMenu) return { buttonProps: { ...ariaProps, onClick: onOpen } };
  return {
    buttonProps: { tabIndex: -1 },
    menuItemProps: { ...ariaProps, onClick: getOwnClickHandler(onOpen) },
  };
}

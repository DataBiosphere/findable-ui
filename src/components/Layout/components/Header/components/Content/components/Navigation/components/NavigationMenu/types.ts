import type { MouseEvent } from "react";
import type { PopupAriaProps } from "../../../../../../../../../../utils/ariaPopup";

/**
 * Props that open the menu and describe it, spread onto whichever element is the menu's trigger.
 */
export interface OpenProps extends PopupAriaProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * Props for the menu's nav button and, in a submenu, the menu item around it.
 */
export interface TriggerProps {
  buttonProps: OpenProps | { tabIndex: number };
  menuItemProps?: OpenProps;
}

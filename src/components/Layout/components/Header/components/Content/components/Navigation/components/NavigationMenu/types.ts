import type { MouseEvent } from "react";
import type { PopupAriaProps } from "../../../../../../../../../../utils/ariaPopup";

/**
 * Props that open the menu and describe it, spread onto whichever element is the menu's trigger.
 */
export interface OpenProps extends PopupAriaProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * Props for the menu's nav button and, in a submenu, the menu item around it. A top-level menu's button takes the open
 * props; a submenu's item takes them and its button leaves the tab order.
 */
export type TriggerProps =
  | { buttonProps: OpenProps; menuItemProps?: undefined }
  | { buttonProps: { tabIndex: -1 }; menuItemProps: OpenProps };

import { ComponentProps } from "react";
import { Checkbox } from "../components/Checkbox/checkbox";
import { ListItemButton } from "../components/ListItemButton/listItemButton";
import { ListItemText } from "../components/ListItemText/listItemText";

/**
 * Props for the SelectListItem component.
 */
export interface SelectListItemProps {
  slotProps: SlotProps;
}

/**
 * Slot props for the SelectListItem component's checkbox, list item button and list item text.
 */
export interface SlotProps {
  checkbox: ComponentProps<typeof Checkbox>;
  listItemButton: ComponentProps<typeof ListItemButton>;
  listItemText: ComponentProps<typeof ListItemText>;
}

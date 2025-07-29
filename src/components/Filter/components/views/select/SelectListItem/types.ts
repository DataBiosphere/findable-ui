import { ComponentProps } from "react";
import { Checkbox } from "../components/Checkbox/checkbox";
import { ListItemButton } from "../components/ListItemButton/listItemButton";
import { ListItemText } from "../components/ListItemText/listItemText";

export interface SelectListItemProps {
  slotProps: SlotProps;
}

export interface SlotProps {
  checkbox: ComponentProps<typeof Checkbox>;
  listItemButton: ComponentProps<typeof ListItemButton>;
  listItemText: ComponentProps<typeof ListItemText>;
}

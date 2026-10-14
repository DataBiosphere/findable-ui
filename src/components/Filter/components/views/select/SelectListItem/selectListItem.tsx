import { JSX, forwardRef } from "react";
import { Checkbox } from "../components/Checkbox/checkbox";
import { ListItemButton } from "../components/ListItemButton/listItemButton";
import { ListItemText } from "../components/ListItemText/listItemText";
import { SelectListItemProps } from "./types";

/**
 * Select list item: a list item button containing a checkbox and text.
 * @param props - Component props.
 * @param props.slotProps - Checkbox, list item button and list item text props.
 * @param ref - Ref forwarded to the list item button element.
 * @returns The select list item.
 */
export const SelectListItem = forwardRef<HTMLDivElement, SelectListItemProps>(
  function SelectListItem(
    { slotProps }: SelectListItemProps,
    ref,
  ): JSX.Element {
    return (
      <ListItemButton ref={ref} {...slotProps.listItemButton}>
        <Checkbox {...slotProps.checkbox} />
        <ListItemText {...slotProps.listItemText} />
      </ListItemButton>
    );
  },
);

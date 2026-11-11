import { JSX, forwardRef } from "react";
import { Checkbox } from "../components/Checkbox/checkbox";
import { ListItemButton } from "../components/ListItemButton/listItemButton";
import { ListItemText } from "../components/ListItemText/listItemText";
import { SelectListItemProps } from "./types";

/**
 * Select list item: a list item button containing a checkbox and text. The button is the item's one tab stop, so it carries the selected state as aria-pressed, from slotProps.listItemButton.selected unless set there.
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
      <ListItemButton
        aria-pressed={slotProps.listItemButton.selected}
        ref={ref}
        {...slotProps.listItemButton}
      >
        <Checkbox {...slotProps.checkbox} />
        <ListItemText {...slotProps.listItemText} />
      </ListItemButton>
    );
  },
);

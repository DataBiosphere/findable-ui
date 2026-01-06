import { JSX, forwardRef } from "react";
import { Checkbox } from "../components/Checkbox/checkbox";
import { ListItemButton } from "../components/ListItemButton/listItemButton";
import { ListItemText } from "../components/ListItemText/listItemText";
import { SelectListItemProps } from "./types";

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

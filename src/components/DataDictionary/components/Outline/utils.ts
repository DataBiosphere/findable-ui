import { RowData } from "@tanstack/react-table";
import { Attribute, Class } from "../../../../common/entities";
import { OutlineItem } from "../../../Layout/components/Outline/types";

/**
 * Returns outline items from classes.
 * @param classes - Class entities.
 * @returns Outline items.
 */
export function buildClassesOutline<T extends RowData = Attribute>(
  classes: Class<T>[]
): OutlineItem[] {
  return classes.map(({ name, title }) => {
    return {
      depth: 2,
      disabled: false,
      hash: name,
      value: title,
    };
  });
}

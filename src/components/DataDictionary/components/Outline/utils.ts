import { Class } from "../../../../common/entities";
import { OutlineItem } from "../../../Layout/components/Outline/types";

/**
 * Returns outline items from classes.
 * @param classes - Class entities.
 * @returns Outline items.
 */
export function buildClassesOutline(classes: Class[]): OutlineItem[] {
  return classes.map(({ name, title }) => {
    return {
      depth: 2,
      disabled: false,
      hash: name,
      value: title,
    };
  });
}

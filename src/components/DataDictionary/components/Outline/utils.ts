import { Class } from "../../../../common/entities";
import { OutlineItem } from "../../../Layout/components/Outline/types";

/**
 * Returns outline items from classes.
 * @param classes - Class entities.
 * @returns Outline items.
 */
export function buildClassesOutline(classes: Class[]): OutlineItem[] {
  return classes.map(({ key, name }) => {
    return {
      depth: 2,
      disabled: false,
      hash: key,
      value: name,
    };
  });
}

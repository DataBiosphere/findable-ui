import { TabsProps } from "@mui/material";
import { OutlineItem } from "../../types";
import { DEFAULT_TAB_VALUE } from "./constants";

/**
 * Returns the tab value for navigation.
 * @param hash - The current hash from the URL.
 * @param outlineItems - Outline items.
 * @returns The item's hash if found and enabled, otherwise returns the default tab value.
 */
export function getNextValue(
  hash: string,
  outlineItems: OutlineItem[]
): TabsProps["value"] {
  const item = outlineItems.find((item) => item.hash === hash);
  if (!item || item.disabled) return DEFAULT_TAB_VALUE;
  return item.hash;
}

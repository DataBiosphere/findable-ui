import slugify from "slugify";
import { TextNode } from "./types";

/**
 * Returns node ID, ensuring uniqueness.
 * @param setOfIds - Set of IDs.
 * @param slug - Slug.
 * @returns node ID.
 */
export function generateUniqueId(setOfIds: Set<string>, slug: string): string {
  let id = slug;
  let i = 1;
  while (setOfIds.has(id)) {
    id = `${slug}-${i}`;
    i++;
  }
  setOfIds.add(id);
  return id;
}

/**
 * Returns true if the node is a text node.
 * @param node - Node.
 * @returns true if the node is a text node.
 */
export function isTextNode<N extends { type: string; value?: string }>(
  node: N,
): node is N & TextNode {
  return node.type === "text" && typeof node.value === "string";
}

/**
 * Slugify the heading text to generate an ID.
 * @param headingText - Heading text.
 * @returns heading ID.
 */
export function slugifyHeading(headingText: string): string {
  return slugify(headingText, { lower: true, strict: true });
}

import { Heading, PhrasingContent, Root } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { OutlineItem } from "../../../components/Layout/components/Outline/types";
import { generateUniqueId, slugifyHeading } from "./utils";

interface Options {
  depth?: { max?: number; min?: number };
  outline: OutlineItem[];
}

/**
 * Remark plugin to generate an outline from MDX content.
 * The outline is a list of headings with their depth, hash, and value.
 * @param options - Options.
 * @param options.depth - Depth of the headings.
 * @param options.depth.max - Maximum depth of the headings.
 * @param options.depth.min - Minimum depth of the headings.
 * @param options.outline - Outline items.
 * @returns plugin to generate an outline from MDX content.
 */
export function remarkHeadings({
  depth: { max = 3, min = 2 } = {},
  outline,
}: Options): Plugin {
  return (tree: Root): void => {
    const setOfIds = new Set<string>();
    visit(tree, "heading", (node) => {
      const heading = node as Heading;
      const { children, depth } = heading;

      if (depth < min || depth > max) return;

      const value = getHeadingTextValue(children);
      const headingSlug = slugifyHeading(value);
      const hash = generateUniqueId(setOfIds, headingSlug);
      outline.push({
        depth,
        hash,
        value,
      });
    });
  };
}

/**
 * Returns the value of the heading.
 * @param children - Phrasing content.
 * @param value - List of heading text values.
 * @returns heading text value.
 */
export function getHeadingTextValue(
  children: PhrasingContent[],
  value: string[] = [],
): string {
  for (const child of children) {
    if ("value" in child) {
      value.push(child.value);
    }
    if ("children" in child) {
      // Recurse into nested children, accumulating text into the shared `value` array.
      // The return value is ignored here because accumulation happens via in-place mutation.
      getHeadingTextValue(child.children, value);
    }
  }
  return value.join("");
}

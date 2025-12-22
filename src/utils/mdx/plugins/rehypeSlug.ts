import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { generateUniqueId, isTextNode, slugifyHeading } from "./utils";
import type { Root, Element, ElementContent } from "hast";
import type { VFile } from "vfile";

/**
 * Rehype plugin to generate an ID for each heading in MDX content.
 * @returns plugin to generate an ID for each heading in MDX content.
 */
export const rehypeSlug: Plugin = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Required by unified, but not used.
  return (tree: Root, file: VFile) => {
    const setOfIds = new Set<string>();
    visit(tree, "element", (node: Element) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        const headingText = getHeadingTextValue(node.children);
        const headingSlug = slugifyHeading(headingText);
        const id = generateUniqueId(setOfIds, headingSlug);
        // Defensive nullish check for node.properties.
        node.properties = node.properties ?? {};
        // Add the ID to the heading element.
        node.properties.id = id;
        node.properties.style = "position: relative;";
        // Append AnchorLink to the heading element.
        node.children.push({
          attributes: [
            {
              name: "anchorLink",
              type: "mdxJsxAttribute",
              value: id,
            },
          ],
          children: [],
          name: "AnchorLink",
          type: "mdxJsxFlowElement",
        });
      }
    });
  };
};

/**
 * Returns the value of the heading.
 * @param children - Phrasing content.
 * @param value - List of heading text values.
 * @returns heading text value.
 */
export function getHeadingTextValue(
  children: ElementContent[],
  value: string[] = [],
): string {
  for (const child of children) {
    if (isTextNode(child)) {
      value.push(child.value);
    }
    if ("children" in child && Array.isArray(child.children)) {
      // Recurse into nested children, accumulating text into the shared `value` array.
      // The return value is ignored here because accumulation happens via in-place mutation.
      getHeadingTextValue(child.children, value);
    }
  }
  return value.join("");
}

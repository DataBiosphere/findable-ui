import { Element, Root, Text } from "hast";
import { visit } from "unist-util-visit";

/**
 * Custom rehype plugin to highlight markdown from given regex.
 * @param options - Options.
 * @param options.regex - Regex to match.
 * @returns A rehype plugin.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity -- ignoring for readability
export function rehypeHighlight(options: { regex: RegExp | undefined }) {
  const { regex } = options;

  if (!regex) return (): void => {};

  return (tree: Root): void => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent) return;
      if (typeof index !== "number") return;

      // Avoid double marking, breaking scripts, and breaking styles.
      if (
        "tagName" in parent &&
        ["mark", "script", "style"].includes(parent.tagName)
      ) {
        return;
      }

      const parts = node.value.split(regex);
      if (parts.length === 1) return; // No text to highlight.

      const newNodes: (Element | Text)[] = [];

      parts.forEach((part, i) => {
        if (!part) return; // Skip empties.
        if (i % 2) {
          // Captured text.
          newNodes.push({
            children: [{ type: "text", value: part }],
            properties: {},
            tagName: "mark",
            type: "element",
          });
        } else {
          // Normal text.
          newNodes.push({ type: "text", value: part });
        }
      });

      // Replace the original text node with the new nodes.
      parent.children.splice(index, 1, ...newNodes);
    });
  };
}

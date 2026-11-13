import type { Element, Root } from "hast";
import { rehypeSlug } from "../src/utils/mdx/plugins/rehypeSlug";

interface MdxJsxAttribute {
  name: string;
  type: string;
  value: string;
}

interface MdxJsxFlowElement {
  attributes: MdxJsxAttribute[];
  name: string;
  type: string;
}

/**
 * Runs the rehypeSlug plugin over the tree.
 * @param tree - Hast tree, transformed in place.
 */
function runRehypeSlug(tree: Root): void {
  const transform = (rehypeSlug as unknown as () => (tree: Root) => void)();
  transform(tree);
}

describe("rehypeSlug", () => {
  it("appends an AnchorLink labelled with the heading text, including nested text", () => {
    const heading: Element = {
      children: [
        { type: "text", value: "Data " },
        {
          children: [{ type: "text", value: "Access" }],
          properties: {},
          tagName: "em",
          type: "element",
        },
        { type: "text", value: " Policy" },
      ],
      properties: {},
      tagName: "h2",
      type: "element",
    };
    runRehypeSlug({ children: [heading], type: "root" });

    const anchorLink = heading.children.at(-1) as unknown as MdxJsxFlowElement;
    expect(anchorLink.name).toBe("AnchorLink");
    expect(anchorLink.attributes).toEqual([
      {
        name: "anchorLink",
        type: "mdxJsxAttribute",
        value: heading.properties.id,
      },
      { name: "label", type: "mdxJsxAttribute", value: "Data Access Policy" },
    ]);
  });
});

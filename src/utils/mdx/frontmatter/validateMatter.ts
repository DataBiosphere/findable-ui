import matter from "gray-matter";
import { FrontmatterProps } from "./types";

/**
 * Returns the frontmatter from the given gray matter file data.
 * @param data - Gray matter file data.
 * @returns Frontmatter.
 */
export function validateMatter<F extends object>(
  data: matter.GrayMatterFile<string>["data"],
): FrontmatterProps<F> | undefined {
  if (
    "title" in data &&
    typeof data.title === "string" &&
    "description" in data &&
    typeof data.description === "string"
  ) {
    return data as FrontmatterProps<F>;
  }
}

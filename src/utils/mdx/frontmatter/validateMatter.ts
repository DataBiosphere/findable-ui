import matter from "gray-matter";
import { FrontmatterProps } from "./types";

/**
 * Returns the frontmatter from the given grey matter file data.
 * @param data - Grey matter file data.
 * @returns Frontmatter.
 */
export function validateMatter<F extends object>(
  data: matter.GrayMatterFile<string>["data"]
): FrontmatterProps<F> | undefined {
  if ("title" in data && "description" in data) {
    return data as FrontmatterProps<F>;
  }
}

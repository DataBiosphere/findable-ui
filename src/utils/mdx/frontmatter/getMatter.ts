import fs from "fs";
import matter from "gray-matter";

/**
 * Returns matter object (frontmatter and content) from the given MD/MDX path.
 * Server-only: uses Node fs, import only in SSG/SSR/build contexts.
 * @param filePath - File path of MD/MDX file.
 * @returns matter object.
 */
export function getMatter(filePath: string): matter.GrayMatterFile<string> {
  const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
  return matter(markdownWithMeta);
}

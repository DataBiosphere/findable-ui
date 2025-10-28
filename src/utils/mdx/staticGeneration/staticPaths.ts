import type { GetStaticPathsResult } from "next";
import { mapMDXSlugByFilePaths } from "../files/mapMDXSlugByFilePaths";
import { resolveRelativeDirs } from "../files/resolveRelativeDirs";

/**
 * Builds Next.js static paths for MDX page files found under the given relative directories.
 * Each path’s `slug` is composed of the file’s relative directory segments plus the MDX filename (without extension).
 * @param relativeDirs - Relative directories to scan for MDX pages.
 * @returns Array of path objects suitable for `getStaticPaths`.
 */
export function buildStaticPaths(
  relativeDirs: string[]
): GetStaticPathsResult["paths"] {
  const slugByFilePaths = mapMDXSlugByFilePaths(
    resolveRelativeDirs(relativeDirs)
  );
  return [...slugByFilePaths].map(([, slug]) => ({ params: { slug } }));
}

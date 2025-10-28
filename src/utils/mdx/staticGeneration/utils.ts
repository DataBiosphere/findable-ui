import { GetStaticPropsContext } from "next/types";
import { resolveRelativeDirs } from "../files/resolveRelativeDirs";

/**
 * Builds the MDX file path from the given list of doc directories and slug.
 * @param dirs - Doc directories e.g. ["app", "docs"].
 * @param slug - Doc slug e.g. ["learn", "featured-analyses"].
 * @returns MDX file path.
 */
export function buildMDXFilePath(
  dirs: string[],
  slug: string[] | undefined
): string | undefined {
  if (!slug) return;
  return resolveRelativeDirs(dirs.concat(slug)).concat(".mdx");
}

/**
 * Returns the MDX page slug for the given static props context and section.
 * @param props - Static props context.
 * @param section - Docs section e.g. "learn".
 * @returns MDX page slug.
 */
export function buildMDXSlug(
  props: GetStaticPropsContext,
  section?: string
): string[] | undefined {
  const slug = props.params?.slug;
  if (!slug || typeof slug === "string") return;
  if (section) return [section, ...slug];
  return slug;
}

import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPropsResult } from "next/types";
import remarkGfm from "remark-gfm";
import { OutlineItem } from "../../../components/Layout/components/Outline/types";
import { getMatter } from "../frontmatter/getMatter";
import { FrontmatterProps } from "../frontmatter/types";
import { validateMatter } from "../frontmatter/validateMatter";
import { rehypeSlug } from "../plugins/rehypeSlug";
import { remarkHeadings } from "../plugins/remarkHeadings";
import { StaticProps } from "./types";

/**
 * Builds the static props for an MDX page: validated frontmatter, serialized MDX source, outline and page title.
 * @param fileName - MDX file name.
 * @param slug - Page slug.
 * @param frontmatterFn - Transforms the validated frontmatter; defaults to returning it unchanged.
 * @param serializeOptions - Options passed to next-mdx-remote's serialize; plugin lists given in mdxOptions replace the default plugins.
 * @param otherProps - Extra props added to the page props; they override built props with the same key.
 * @returns The page props, or undefined when the file name or slug is missing, or the frontmatter is invalid, hidden or has no title.
 */
export async function buildStaticProps<F extends object, P extends object>(
  fileName: string | undefined,
  slug: string[] | undefined,
  frontmatterFn = (
    frontmatter: FrontmatterProps<F> | undefined,
  ): FrontmatterProps<F> | undefined => frontmatter,
  serializeOptions: Parameters<typeof serialize>[1] = {},
  otherProps: P = {} as P,
): Promise<
  GetStaticPropsResult<StaticProps<FrontmatterProps<F>, P>> | undefined
> {
  if (!slug) return;
  if (!fileName) return;

  // Extract frontmatter and content from the MDX file.
  const { content, data } = getMatter(fileName);
  const frontmatter = frontmatterFn(validateMatter(data));

  // If the frontmatter is hidden, return.
  if (!frontmatter || frontmatter.hidden) return;

  // We expect the frontmatter to have a title.
  if (!frontmatter.title) return;

  // Serialize the MDX content.
  const outline: OutlineItem[] = [];
  const mdxSource = await serialize(content, {
    ...serializeOptions,
    // After the spread so a consumer's `blockJS: undefined` (from a
    // destructure-respread) doesn't silently re-enable next-mdx-remote@6's
    // destructive `blockJS: true` default. Consumers can still opt in
    // explicitly by passing `blockJS: true`.
    blockJS: serializeOptions.blockJS ?? false,
    mdxOptions: {
      development: false,
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [[remarkHeadings, { outline }], remarkGfm],
      ...serializeOptions.mdxOptions,
    },
    scope: { ...serializeOptions.scope, frontmatter },
  });

  const { title: pageTitle } = frontmatter;

  return {
    props: {
      frontmatter,
      mdxSource,
      outline,
      pageTitle,
      slug,
      ...otherProps,
    },
  };
}

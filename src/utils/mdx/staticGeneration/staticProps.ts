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

export async function buildStaticProps<F extends object, P extends object>(
  fileName: string | undefined,
  slug: string[] | undefined,
  frontmatterFn = (
    frontmatter: FrontmatterProps<F> | undefined
  ): FrontmatterProps<F> | undefined => frontmatter,
  serializeOptions: Parameters<typeof serialize>[1] = {},
  otherProps: P = {} as P
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

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { OutlineItem } from "../../../components/Layout/components/Outline/types";
import { FrontmatterProps } from "../frontmatter/types";

interface BaseStaticProps<F extends object> {
  frontmatter: FrontmatterProps<F> | null;
  mdxSource: MDXRemoteSerializeResult | null;
  outline: OutlineItem[] | null;
  pageTitle: string;
  slug: string[];
}

export type StaticProps<
  F extends object,
  P extends object,
> = BaseStaticProps<F> & P;

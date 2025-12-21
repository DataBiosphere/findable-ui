import { Typography } from "@mui/material";
import {
  JSX,
  useEffect,
  useMemo,
  useState,
  createElement,
  Fragment,
  isValidElement,
} from "react";
import rehypeRaw from "rehype-raw";
import rehypeReact, { Components } from "rehype-react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { COMPONENTS } from "./constants";
import { StyledContainer } from "./markdownRenderer.styles";
import { rehypeHighlight } from "./rehypeHighlight";
import { MarkdownRendererProps } from "./types";

/**
 * Markdown Rendering - Pipeline Version Constraints
 *
 * next-mdx-remote and @next/mdx currently embed MDX v3. MDX v3 is compiled
 * for the "Unified 10" tool-chain and therefore only functions with unified
 * 10.x, remark-parse 10.x, remark-rehype 10.x and, critically, remark-gfm 3.x.
 *
 * Because remark-gfm 3.x is required, migrating to Unified 11 is not yet possible.
 *
 * rehype plug-ins are chosen from versions that still target Unified 10:
 * rehype-raw 7.x, rehype-sanitize 6.x and rehype-react 8.x.
 */

export const MarkdownRenderer = ({
  className,
  components: componentOptions = COMPONENTS,
  regex: markdownRegex,
  value,
}: MarkdownRendererProps): JSX.Element => {
  const [element, setElement] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [components] = useState<Components>(componentOptions);
  const regex = useMemo(() => markdownRegex, [markdownRegex]);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(rehypeHighlight, { regex })
      // @ts-expect-error - rehype-react plugin type compatibility issue with unified processor.
      // The plugin is functionally compatible, but TypeScript types don't match exactly
      // due to unified version constraints. This is a known issue with rehype-react v8.x
      // when used with unified v10.x pipeline.
      .use(rehypeReact, { Fragment, components, createElement });

    processor
      .process(value)
      .then(({ result }) => {
        if (cancelled) return;
        if (isValidElement(result)) setElement(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return (): void => {
      cancelled = true;
    };
  }, [components, regex, value]);

  if (error)
    return (
      <Typography
        color={TYPOGRAPHY_PROPS.COLOR.ERROR}
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
      >
        {error}
      </Typography>
    );

  return <StyledContainer className={className}>{element}</StyledContainer>;
};

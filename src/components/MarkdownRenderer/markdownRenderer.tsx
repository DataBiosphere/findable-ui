import { Typography } from "@mui/material";
import {
  isValidElement,
  JSX,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as production from "react/jsx-runtime";
import rehypeRaw from "rehype-raw";
import rehypeReact, { Components } from "rehype-react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { VFile } from "vfile";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { COMPONENTS } from "./constants";
import { StyledContainer } from "./markdownRenderer.styles";
import { rehypeHighlight } from "./rehypeHighlight";
import { MarkdownRendererProps } from "./types";

export const MarkdownRenderer = ({
  className,
  components: componentOptions = COMPONENTS,
  regex: markdownRegex,
  value,
}: MarkdownRendererProps): JSX.Element => {
  const [element, setElement] = useState<ReactElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [components] = useState<Components>(componentOptions);

  // The processor only depends on `components` and the highlight `regex` (not
  // `value`), so memoize it to avoid rebuilding the plugin chain on every value
  // change. A unified processor freezes on first use and is reusable across
  // process() calls.
  const processor = useMemo(
    () =>
      unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize)
        .use(rehypeHighlight, { regex: markdownRegex })
        .use(rehypeReact, {
          Fragment: production.Fragment,
          components,
          jsx: production.jsx,
          jsxs: production.jsxs,
        }),
    [components, markdownRegex],
  );

  useEffect(() => {
    let cancelled = false;

    processor
      .process(value)
      .then((file: VFile) => {
        if (cancelled) return;
        setError(null);
        setElement(isValidElement(file.result) ? file.result : null);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return (): void => {
      cancelled = true;
    };
  }, [processor, value]);

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

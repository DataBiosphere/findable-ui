import { Typography } from "@mui/material";
import {
  JSX,
  useEffect,
  useMemo,
  useState,
  createElement,
  Fragment,
  isValidElement,
  ReactElement,
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
import type { VFile } from "vfile";

export const MarkdownRenderer = ({
  className,
  components: componentOptions = COMPONENTS,
  regex: markdownRegex,
  value,
}: MarkdownRendererProps): JSX.Element => {
  const [element, setElement] = useState<ReactElement | null>(null);
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
      .use(rehypeReact, { Fragment, components, createElement });

    processor
      .process(value)
      .then((file: VFile) => {
        if (cancelled) return;
        if (isValidElement(file.result)) setElement(file.result);
      })
      .catch((err: Error) => {
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

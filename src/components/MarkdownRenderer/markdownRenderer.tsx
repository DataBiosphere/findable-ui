import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as production from "react/jsx-runtime";
import rehypeRaw from "rehype-raw";
import rehypeReact, { Components } from "rehype-react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { COMPONENTS } from "./contants";
import { StyledContainer } from "./markdownRenderer.styles";
import { MarkdownRendererProps } from "./types";

export const MarkdownRenderer = ({
  className,
  components = COMPONENTS,
  value,
}: MarkdownRendererProps): JSX.Element => {
  const [element, setElement] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [componentOptions] = useState<Partial<Components>>(components);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize, defaultSchema)
      .use(rehypeReact, { ...production, components: componentOptions });

    processor
      .process(value)
      .then((file) => {
        if (!cancelled) setElement(file?.result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return (): void => {
      cancelled = true;
    };
  }, [componentOptions, value]);

  if (error)
    return (
      <Typography
        color={TYPOGRAPHY_PROPS.COLOR.ERROR}
        variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_SMALL_400}
      >
        {error}
      </Typography>
    );

  return <StyledContainer className={className}>{element}</StyledContainer>;
};

// TODO deprecate component if possible (see MDXMarkdown)
import DOMPurify from "isomorphic-dompurify";
import React from "react";

export interface MarkdownProps {
  content: string;
}

export const Markdown = ({ content }: MarkdownProps): JSX.Element => {
  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
  );
};

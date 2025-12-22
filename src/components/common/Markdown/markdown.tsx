// TODO deprecate component if possible (see MDXMarkdown)
import { Box as MBox, BoxProps as MBoxProps } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { JSX } from "react";

export interface MarkdownProps {
  content: string;
  sx?: MBoxProps["sx"];
}

export const Markdown = ({ content, sx }: MarkdownProps): JSX.Element => {
  return (
    <MBox
      component="div"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      sx={{ minWidth: 0, wordBreak: "break-word", ...sx }}
    />
  );
};

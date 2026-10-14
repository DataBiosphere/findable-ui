import { Components } from "rehype-react";
import { BaseComponentProps } from "../types";

/**
 * Props for the MarkdownRenderer component.
 */
export interface MarkdownRendererProps extends BaseComponentProps {
  components?: Components;
  regex?: RegExp;
  value: string;
}

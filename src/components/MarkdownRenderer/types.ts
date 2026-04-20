import { Components } from "rehype-react";
import { BaseComponentProps } from "../types";

export interface MarkdownRendererProps extends BaseComponentProps {
  components?: Components;
  regex?: RegExp;
  value: string;
}

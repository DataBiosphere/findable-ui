import { BaseComponentProps } from "../types";
import { Components } from "rehype-react";

export interface MarkdownRendererProps extends BaseComponentProps {
  components?: Components;
  regex?: RegExp;
  value: string;
}

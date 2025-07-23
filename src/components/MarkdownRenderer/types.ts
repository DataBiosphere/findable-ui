import { ComponentType } from "react";
import { BaseComponentProps } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- rehype-react passes arbitrary HTML attributes to components when rendering markdown elements
export type MarkdownRendererComponents = Record<string, ComponentType<any>>;

export interface MarkdownRendererProps extends BaseComponentProps {
  components?: MarkdownRendererComponents;
  regex?: RegExp;
  value: string;
}

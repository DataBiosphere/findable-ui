import { JSX } from "react";
import { ContentsTab } from "./components/ContentsTab/contentsTab";
import { StyledOutline } from "./outline.styles";
import { OutlineProps } from "./types";

/**
 * Data dictionary outline: the page outline with an "Entity Type" contents tab.
 * @param props - Component props, the outline items plus Mui Tabs props.
 * @param props.outline - Outline items.
 * @returns The outline.
 */
export const Outline = ({
  outline,
  ...props /* MuiTabsProps */
}: OutlineProps): JSX.Element => {
  return <StyledOutline Contents={ContentsTab} outline={outline} {...props} />;
};

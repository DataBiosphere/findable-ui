import React from "react";
import { ContentsTab } from "./components/ContentsTab/contentsTab";
import { StyledOutline } from "./outline.styles";
import { OutlineProps } from "./types";

export const Outline = ({
  outline,
  ...props /* MuiTabsProps */
}: OutlineProps): JSX.Element => {
  return <StyledOutline Contents={ContentsTab} outline={outline} {...props} />;
};

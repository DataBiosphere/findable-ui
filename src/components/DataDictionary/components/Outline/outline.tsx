import React, { useMemo } from "react";
import { ContentsTab } from "./components/ContentsTab/contentsTab";
import { StyledOutline } from "./outline.styles";
import { OutlineProps } from "./types";
import { buildClassesOutline } from "./utils";

export const Outline = ({ classes }: OutlineProps): JSX.Element => {
  const outline = useMemo(() => buildClassesOutline(classes), [classes]);
  return <StyledOutline Contents={ContentsTab} outline={outline} />;
};

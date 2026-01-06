import { JSX } from "react";
import { TAB_PROPS } from "./constants";
import { StyledContentsTab } from "./contentsTab.styles";

export const ContentsTab = (): JSX.Element => {
  return <StyledContentsTab {...TAB_PROPS} />;
};

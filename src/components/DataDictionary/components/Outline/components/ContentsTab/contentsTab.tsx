import { JSX } from "react";
import { TAB_PROPS } from "./constants";
import { StyledContentsTab } from "./contentsTab.styles";

/**
 * Data dictionary outline's first tab, labelled "Entity Type", with no icon.
 * @returns The contents tab.
 */
export const ContentsTab = (): JSX.Element => {
  return <StyledContentsTab {...TAB_PROPS} />;
};

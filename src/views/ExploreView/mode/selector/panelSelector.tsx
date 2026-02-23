import { JSX } from "react";
import { useMode } from "../provider/hook";
import { MODE } from "../types";
import { ChildrenProps } from "../../../../components/types";
import { Panel as ResearchPanel } from "../../research/panel/panel";
import { Panel as SearchPanel } from "../../search/panel/panel";

/**
 * Panel selector for explore view "search" or "research" modes.
 *
 * This component determines which panel to display in the explore view.
 *
 * Available strategies:
 * - Research panel: AI-assisted discovery queries.
 * - Search panel: User-directed filter exploration.
 *
 * @param props - Component props.
 * @returns The selected panel component.
 */
export const PanelSelector = (props: ChildrenProps): JSX.Element | null => {
  const { value } = useMode();
  switch (value) {
    case MODE.RESEARCH:
      return <ResearchPanel />;
    case MODE.SEARCH:
      // TODO: Implement "search" panel, refactor ExploreView component filter-search UI into this panel, and remove the related code from ExploreView.
      return <SearchPanel>{props.children}</SearchPanel>;
    default:
      return null;
  }
};

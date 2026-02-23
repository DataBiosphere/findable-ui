import { JSX } from "react";
import { ChildrenProps } from "../../../../components/types";
import { TEST_IDS } from "../../../../tests/testIds";

/**
 * Renders the search panel.
 * @param props - Component props.
 * @param props.children - Children.
 * @returns The search panel container element.
 */
export const Panel = ({ children }: ChildrenProps): JSX.Element => {
  return <div data-testid={TEST_IDS.SEARCH_PANEL}>{children}</div>;
};

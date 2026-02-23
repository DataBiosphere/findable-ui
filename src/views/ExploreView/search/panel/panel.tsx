import { JSX } from "react";
import { useMode } from "../../mode/provider/hook";
import { MODE } from "../../mode/types";
import { ChildrenProps } from "../../../../components/types";
import { TEST_IDS } from "../../../../tests/testIds";

export const Panel = ({ children }: ChildrenProps): JSX.Element | null => {
  const { value } = useMode();

  if (value === MODE.RESEARCH) return null;

  return <div data-testid={TEST_IDS.SEARCH_PANEL}>{children}</div>;
};

import { JSX } from "react";
import { useMode } from "../../mode/provider/hook";
import { MODE } from "../../mode/types";
import { TEST_IDS } from "../../../../tests/testIds";

export const Panel = (): JSX.Element | null => {
  const { value } = useMode();

  if (value === MODE.SEARCH) return null;

  return <div data-testid={TEST_IDS.RESEARCH_PANEL}>research panel</div>;
};

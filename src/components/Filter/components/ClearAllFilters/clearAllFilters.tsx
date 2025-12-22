import { JSX } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../providers/exploreState";
import { BUTTON_PROPS } from "../../../../styles/common/mui/button";
import { TEST_IDS } from "../../../../tests/testIds";
import { StyledButton } from "./clearAllFilters.styles";

export const ClearAllFilters = (): JSX.Element => {
  const { exploreDispatch } = useExploreState();

  const onClearFilters = (): void => {
    exploreDispatch({
      payload: undefined,
      type: ExploreActionKind.ClearFilters,
    });
  };

  return (
    <StyledButton
      color={BUTTON_PROPS.COLOR.PRIMARY}
      data-testid={TEST_IDS.CLEAR_ALL_FILTERS}
      onClick={onClearFilters}
      variant={BUTTON_PROPS.VARIANT.TEXT}
    >
      Clear All
    </StyledButton>
  );
};

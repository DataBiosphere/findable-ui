import React from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../providers/exploreState";
import { TEST_IDS } from "../../../../tests/testIds";
import { ButtonTextPrimary } from "../../../common/Button/components/ButtonTextPrimary/buttonTextPrimary";

export const ClearAllFilters = (): JSX.Element => {
  const { exploreDispatch } = useExploreState();

  const onClearFilters = (): void => {
    exploreDispatch({
      payload: undefined,
      type: ExploreActionKind.ClearFilters,
    });
  };

  return (
    <ButtonTextPrimary
      data-testid={TEST_IDS.CLEAR_ALL_FILTERS}
      onClick={onClearFilters}
    >
      Clear All
    </ButtonTextPrimary>
  );
};

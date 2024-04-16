import React from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../providers/exploreState";
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
    <ButtonTextPrimary onClick={onClearFilters}>Clear All</ButtonTextPrimary>
  );
};

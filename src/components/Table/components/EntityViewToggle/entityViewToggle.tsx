import React from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import {
  ENTITY_VIEW,
  ExploreActionKind,
} from "../../../../providers/exploreState";
import { ToggleButtonGroup } from "../../../common/ToggleButtonGroup/toggleButtonGroup";

export const EntityViewToggle = (): JSX.Element => {
  const { exploreDispatch } = useExploreState();
  const toggleButtons = [
    {
      label: "Exact Match",
      onToggle: () => onChange(ENTITY_VIEW.EXACT),
      value: ENTITY_VIEW.EXACT,
    },
    {
      label: "Related Match",
      onToggle: () => onChange(ENTITY_VIEW.RELATED),
      value: ENTITY_VIEW.RELATED,
    },
  ];

  /**
   * Callback fired when toggle button value changes.
   * @param entityView - Entity list view.
   */
  const onChange = (entityView: ENTITY_VIEW): void => {
    exploreDispatch({
      payload: entityView,
      type: ExploreActionKind.ToggleEntityView,
    });
  };

  return <ToggleButtonGroup toggleButtons={toggleButtons} />;
};

import { useCallback, useContext } from "react";
import { clearPreset as clearPresetAction } from "../../actions/clearPreset/dispatch";
import { setPreset as setPresetAction } from "../../actions/setPreset/dispatch";
import { ExploreViewContext } from "../../context";
import { EntityId } from "../../types";
import { UseEntityViewDispatch } from "./types";

/**
 * Hook to dispatch ExploreView actions for a specific entity.
 * @param entityId - Entity identifier.
 * @returns Object containing action dispatch functions.
 */
export const useEntityViewDispatch = (
  entityId: EntityId,
): UseEntityViewDispatch => {
  const { dispatch } = useContext(ExploreViewContext);

  const onClearPreset = useCallback(() => {
    dispatch(clearPresetAction({ entityId }));
  }, [dispatch, entityId]);

  const onSetPreset = useCallback(
    (presetKey: string) => {
      dispatch(setPresetAction({ entityId, presetKey }));
    },
    [dispatch, entityId],
  );

  return { onClearPreset, onSetPreset };
};

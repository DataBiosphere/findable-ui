/**
 * Return type for the useEntityViewDispatch hook.
 */
export interface UseEntityViewDispatch {
  onClearPreset: () => void;
  onSetPreset: (presetKey: string) => void;
}

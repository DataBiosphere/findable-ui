/**
 * Reducer state initializer.
 * @param initialState - Initial state.
 * @returns initial reducer state.
 */
export function initializer<S>(initialState: S): S {
  return {
    ...initialState,
    initialState,
  };
}

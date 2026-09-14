/**
 * A MUI slot prop: either a props object, or — as MUI v7 also allows — a
 * callback deriving the props from the slot's owner state.
 */
type SlotPropsCallback = (ownerState: never) => object;

/**
 * Merges MUI slot props, with a later value's keys winning over an earlier
 * one's. A plain spread is not enough: MUI v7 allows any slot prop to be a
 * callback deriving props from the slot's owner state, and spreading a
 * function yields `{}`, silently dropping it. When any value is a callback the
 * result is itself a callback, resolving each value against the owner state
 * before merging.
 * @param slotProps - Slot props to merge, in increasing precedence.
 * @returns The merged slot prop, as a callback if any input was one.
 */
export function mergeSlotProps<T extends object>(
  ...slotProps: (T | undefined)[]
): T {
  if (slotProps.some((slotProp) => typeof slotProp === "function")) {
    return ((ownerState: never) =>
      slotProps.reduce<object>(
        (acc, slotProp) => ({
          ...acc,
          ...resolveSlotProps(slotProp, ownerState),
        }),
        {},
      )) as T;
  }
  return slotProps.reduce<object>(
    (acc, slotProp) => ({ ...acc, ...slotProp }),
    {},
  ) as T;
}

/**
 * Returns a slot prop's props object, calling it with the owner state when it
 * is a callback.
 * @param slotProp - Slot prop to resolve.
 * @param ownerState - Owner state the slot's callback derives its props from.
 * @returns The resolved props, or undefined when no slot prop is given.
 */
function resolveSlotProps<T extends object>(
  slotProp: T | undefined,
  ownerState: never,
): object | undefined {
  return typeof slotProp === "function"
    ? (slotProp as SlotPropsCallback)(ownerState)
    : slotProp;
}

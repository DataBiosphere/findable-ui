import { mergeSlotProps as muiMergeSlotProps } from "@mui/material/utils";

/**
 * A MUI slot prop: a props object, or a callback deriving the props from the
 * component's owner state. `never` as the parameter lets any slot's callback,
 * whatever its owner state type, be passed in.
 */
type SlotProps = object | ((ownerState: never) => object);

type SlotPropsCallback = (ownerState: { className?: string }) => object;

/**
 * Merges two MUI slot props with MUI's own `mergeSlotProps`, the external value
 * winning: `className`, `style` and `sx` are combined and matching event
 * handlers are chained, and a callback slot prop is honoured. Two adjustments
 * make it safe to use inside a component rather than only at MUI's own call
 * sites:
 * - an absent default is replaced with an empty object, because MUI's helper
 *   reads keys off the default and throws on `undefined`.
 * - when the result is a callback, it is called with the owner state's
 *   `className` removed. MUI's helper adds `ownerState.className` into the
 *   merged `className`, and a component's owner state carries its root's
 *   `className`, so the root's classes would otherwise be copied onto the slot.
 * @param external - Higher-precedence slot props.
 * @param defaults - Lower-precedence slot props.
 * @returns The merged slot props, as a callback if either input was one.
 */
export function mergeSlotProps<T extends SlotProps>(
  external: T | undefined,
  defaults: T | undefined,
): T {
  const merged = (
    muiMergeSlotProps as (external: unknown, defaults: unknown) => unknown
  )(external, defaults ?? {});
  if (typeof merged !== "function") return merged as T;
  return ((ownerState: { className?: string }) =>
    (merged as SlotPropsCallback)({
      ...ownerState,
      className: undefined,
    })) as T;
}

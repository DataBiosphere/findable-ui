import { mergeSlotProps as muiMergeSlotProps } from "@mui/material/utils";

/**
 * A MUI slot prop: a props object, or a callback deriving the props from the
 * component's owner state. `never` as the parameter lets any slot's callback,
 * whatever its owner state type, be passed in.
 */
type SlotProps = object | ((ownerState: never) => object);

type MuiMergeSlotProps = (external: unknown, defaults: unknown) => object;

type SlotPropsCallback = (ownerState: object) => object;

/**
 * Returns slot props with the given DOM id applied over them. The id goes on
 * last and overrides any id already set, because it is the one a trigger's
 * `aria-controls` points at — honouring another would leave that reference
 * dangling. A blank or absent id is not applied, so the slot never renders
 * `id=""`, which resolves to nothing.
 * @param id - DOM id for the slot.
 * @param slotProps - Slot props to apply the id over.
 * @returns The slot props carrying the id, as a callback if the input was one.
 */
export function applySlotId<T extends SlotProps>(
  id: string | undefined,
  slotProps: T | undefined,
): T {
  if (!id) return (slotProps ?? {}) as T;
  return mergeSlotProps({ id } as T, slotProps);
}

/**
 * Merges two MUI slot props with the semantics of MUI's own `mergeSlotProps`,
 * the external value winning: `className`, `style` and `sx` are combined,
 * matching event handlers are chained, and a callback slot prop is honoured.
 * Two adjustments make it safe to use inside a component rather than only at
 * MUI's own call sites:
 * - an absent default is replaced with an empty object, because MUI's helper
 *   reads keys off the default and throws on `undefined`.
 * - callbacks are resolved here, and the resolved objects merged, rather than
 *   left to MUI's callback branch. That branch adds `ownerState.className` to
 *   the merged `className`, and a component's owner state carries its root's
 *   `className`, so the root's classes would be copied onto the slot. Each
 *   callback still receives the owner state unchanged — the external one with
 *   the resolved defaults over it, as MUI passes it.
 * @param external - Higher-precedence slot props.
 * @param defaults - Lower-precedence slot props.
 * @returns The merged slot props, as a callback if either input was one.
 */
export function mergeSlotProps<T extends SlotProps>(
  external: T | undefined,
  defaults: T | undefined,
): T {
  const merge = muiMergeSlotProps as MuiMergeSlotProps;
  if (typeof external !== "function" && typeof defaults !== "function") {
    return merge(external, defaults ?? {}) as T;
  }
  return ((ownerState: object) => {
    const resolvedDefaults = resolveSlotProps(defaults, ownerState);
    const resolvedExternal = resolveSlotProps(external, {
      ...ownerState,
      ...resolvedDefaults,
    });
    return merge(resolvedExternal, resolvedDefaults);
  }) as T;
}

/**
 * Merges records of MUI slot props — a component's `slotProps` — slot by slot,
 * later records winning. Each slot is merged with `mergeSlotProps` rather than
 * replaced, so a default set on one slot survives a caller setting another prop
 * on that same slot. Slots set to `undefined` are skipped.
 * @param records - Slot prop records, in increasing precedence.
 * @returns The merged slot prop record.
 */
export function mergeSlotPropsRecords<T extends object>(
  ...records: (T | undefined)[]
): T {
  const merged: Record<string, SlotProps> = {};
  for (const record of records) {
    if (!record) continue;
    for (const [key, value] of Object.entries(record)) {
      if (value === undefined) continue;
      merged[key] = mergeSlotProps<SlotProps>(value, merged[key]);
    }
  }
  return merged as T;
}

/**
 * Resolves a slot prop against an owner state, calling it if it is a callback.
 * @param slotProps - Slot props to resolve.
 * @param ownerState - Owner state to resolve a callback against.
 * @returns The resolved slot props, or an empty object if there are none.
 */
function resolveSlotProps(
  slotProps: SlotProps | undefined,
  ownerState: object,
): object {
  if (typeof slotProps === "function") {
    return (slotProps as SlotPropsCallback)(ownerState);
  }
  return slotProps ?? {};
}

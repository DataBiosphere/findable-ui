import type { MenuProps } from "@mui/material";
import { mergeSlotProps } from "@mui/material/utils";
import type { AriaAttributes } from "react";

/**
 * Values for `aria-haspopup`, naming the kind of surface a control opens.
 * `MENU` is `true`, which ARIA 1.2 defines as an exact synonym for `"menu"` —
 * the two assert the same thing, and `true` is the spelling used here. Set it
 * only on controls whose surface really carries `role="menu"`; a disclosure,
 * where a region expands in place, takes no `aria-haspopup` at all.
 */
export const HAS_POPUP = {
  DIALOG: "dialog",
  MENU: true,
} as const;

type MenuSlotProps = MenuProps["slotProps"];
type MenuListSlotProps = NonNullable<MenuSlotProps>["list"];

export interface PopupAriaOptions {
  /**
   * Whether the control is disabled. A disabled control cannot open its
   * surface, so `aria-expanded` and `aria-controls` are both omitted rather
   * than describing an interaction that is not offered. `aria-haspopup` stays,
   * because what the control would open has not changed.
   */
  disabled?: boolean;
  /**
   * The kind of surface the control opens, for controls that open a popup.
   * Omitted for disclosures, where a region expands in place and
   * `aria-haspopup` does not apply.
   */
  hasPopup?: AriaAttributes["aria-haspopup"];
  /**
   * DOM id of the surface the control opens. Optional so a control whose
   * surface has no id still gets `aria-expanded`; `aria-controls` is then
   * omitted rather than pointed at nothing. A blank id counts as no id.
   */
  id?: string;
  /** Whether the surface is currently open. */
  open: boolean;
}

export interface PopupAriaProps {
  "aria-controls": string | undefined;
  "aria-expanded": boolean | undefined;
  "aria-haspopup"?: AriaAttributes["aria-haspopup"];
}

/**
 * Returns `slotProps` for a MUI `Menu` with the given id placed on its list.
 * The id cannot go on `Menu` itself: MUI renders the menu root as a
 * presentational modal wrapper whose first child is the backdrop, so a root id
 * would have the trigger's `aria-controls` resolve to the backdrop container
 * rather than to the `role="menu"` list. Later bases win, and each one's `list`
 * slot is merged with MUI's own `mergeSlotProps` rather than replaced — so list
 * props set by a default or by a caller survive alongside the id, callback slot
 * props are honoured, and `className`, `style`, `sx` and event handlers are
 * combined rather than overwritten. The one exception is `id` itself, which is
 * applied last and overrides a caller's. The component owns that id because it
 * is what the trigger's `aria-controls` points at; honouring a caller's id here
 * would leave that reference dangling.
 * @param id - DOM id to place on the menu's list.
 * @param bases - Slot props to merge beneath the id, in increasing precedence.
 * @returns Slot props carrying the id on the list slot.
 */
export function getMenuSlotProps(
  id: string,
  ...bases: (MenuSlotProps | undefined)[]
): MenuSlotProps {
  const merged = bases.reduce<NonNullable<MenuSlotProps>>(
    (acc, base) => ({
      ...acc,
      ...base,
      list: mergeListSlotProps(base?.list, acc.list),
    }),
    {},
  );
  return { ...merged, list: mergeListSlotProps({ id }, merged.list) };
}

/**
 * Returns the ARIA props a control needs to announce the surface it opens and
 * whether that surface is currently open. For surfaces that only mount while
 * open — MUI `Menu`, `Popper` and `Dialog` all unmount their children by
 * default — `aria-controls` is dropped while closed, because pointing it at an
 * id that is not in the document is worse than omitting it. A blank id is
 * dropped for the same reason: `aria-controls=""` resolves to nothing. Controls
 * whose surface stays mounted should set `aria-controls` directly instead.
 * @param options - Popup ARIA options.
 * @param options.disabled - Whether the control is disabled; omits the state.
 * @param options.hasPopup - Kind of surface opened, omitted for disclosures.
 * @param options.id - DOM id of the surface the control opens.
 * @param options.open - Whether the surface is currently open.
 * @returns The control's popup ARIA props.
 */
export function getPopupAriaProps({
  disabled = false,
  hasPopup,
  id,
  open,
}: PopupAriaOptions): PopupAriaProps {
  return {
    "aria-controls": !disabled && open && id ? id : undefined,
    "aria-expanded": disabled ? undefined : open,
    ...(hasPopup ? { "aria-haspopup": hasPopup } : {}),
  };
}

/**
 * Merges two list slot props with MUI's `mergeSlotProps`, the external value
 * winning. MUI's helper reads keys off the default value, so an absent default
 * is replaced with an empty object rather than passed through.
 * @param external - Higher-precedence list slot props.
 * @param defaults - Lower-precedence list slot props.
 * @returns The merged list slot props.
 */
function mergeListSlotProps(
  external: MenuListSlotProps | undefined,
  defaults: MenuListSlotProps | undefined,
): MenuListSlotProps {
  return mergeSlotProps(external, defaults ?? {}) as MenuListSlotProps;
}

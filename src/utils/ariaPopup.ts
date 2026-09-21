import type { MenuProps } from "@mui/material";
import type { AriaAttributes } from "react";
import { mergeSlotProps } from "./slotProps";

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

export interface PopupAriaOptions {
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
  "aria-expanded": boolean;
  "aria-haspopup"?: AriaAttributes["aria-haspopup"];
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
 * @param options.hasPopup - Kind of surface opened, omitted for disclosures.
 * @param options.id - DOM id of the surface the control opens.
 * @param options.open - Whether the surface is currently open.
 * @returns The control's popup ARIA props.
 */
export function getPopupAriaProps({
  hasPopup,
  id,
  open,
}: PopupAriaOptions): PopupAriaProps {
  return {
    "aria-controls": open && id ? id : undefined,
    "aria-expanded": open,
    ...(hasPopup ? { "aria-haspopup": hasPopup } : {}),
  };
}

/**
 * Returns `slotProps` for a MUI `Menu` with the given id placed on its list.
 * The id cannot go on `Menu` itself: MUI renders the menu root as a
 * presentational modal wrapper whose first child is the backdrop, so a root id
 * would have the trigger's `aria-controls` resolve to the backdrop container
 * rather than to the `role="menu"` list. Later bases win, and each one's `list`
 * slot is merged rather than replaced, so list props set by a default or by a
 * caller survive alongside the id — the one exception being `id` itself, which
 * is applied last and overrides a caller's. The component owns that id because
 * it is what the trigger's `aria-controls` points at; honouring a caller's id
 * here would leave that reference dangling.
 * @param id - DOM id to place on the menu's list.
 * @param bases - Slot props to merge beneath the id, in increasing precedence.
 * @returns Slot props carrying the id on the list slot.
 */
export function getMenuSlotProps(
  id: string,
  ...bases: (MenuProps["slotProps"] | undefined)[]
): MenuProps["slotProps"] {
  const merged = bases.reduce<MenuProps["slotProps"]>(
    (acc, base) => ({
      ...acc,
      ...base,
      list: mergeSlotProps(acc?.list, base?.list),
    }),
    {},
  );
  return { ...merged, list: mergeSlotProps(merged?.list, { id }) };
}

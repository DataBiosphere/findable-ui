import type { PopoverProps } from "@mui/material";
import { applySlotId } from "../../../../../../utils/slotProps";

/**
 * Returns the drawer's slot props, placing the id and the dialog semantics on
 * the paper so the trigger's `aria-controls` resolves to the drawer rather than
 * to its presentational root. `TemporarySidebar` is a MUI `Popover`, which —
 * unlike `Drawer` — gives its paper no role and no name of its own, so both are
 * set here; a trigger declaring `aria-haspopup="dialog"` would otherwise point
 * at an unnamed generic container. The popover is rendered in a MUI `Modal`,
 * which traps focus and hides the rest of the page, so `aria-modal` is accurate.
 * A blank id — the `DrawerContext` default outside a provider — is treated as
 * no id rather than rendered as `id=""`.
 * @param id - DOM id for the drawer surface.
 * @param label - Accessible name for the drawer dialog.
 * @returns Slot props for the drawer.
 */
export function getDrawerSlotProps(
  id: string | undefined,
  label: string,
): PopoverProps["slotProps"] {
  return {
    paper: applySlotId(id, {
      "aria-label": label,
      "aria-modal": true,
      role: "dialog",
      square: true,
    }),
    root: { slotProps: { backdrop: { invisible: false } } },
  };
}

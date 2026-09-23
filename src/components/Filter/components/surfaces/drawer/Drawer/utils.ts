import type { DrawerProps as MDrawerProps } from "@mui/material";
import { mergeSlotProps } from "../../../../../../utils/slotProps";
import { ARIA_LABEL } from "./constants";
import type { PaperSlotProps } from "./types";

/**
 * Returns the drawer's paper slot props. The paper is the element carrying
 * `role="dialog"`; the drawer root is a presentational wrapper, so the dialog's
 * name and the id the trigger's `aria-controls` targets both go here. MUI
 * Drawer builds `{ paper: PaperProps, ...slotProps }`, so a caller's deprecated
 * `PaperProps` would be dropped by setting the paper slot; they are merged in
 * instead. Precedence, lowest first: the default name, `PaperProps`, the
 * caller's `slotProps.paper`, then the id — which overrides a caller's because
 * it is what the trigger's `aria-controls` points at.
 * @param id - DOM id for the drawer surface.
 * @param paperProps - Caller's deprecated `PaperProps`.
 * @param paperSlotProps - Caller's `slotProps.paper`.
 * @returns Paper slot props for the drawer.
 */
export function getPaperSlotProps(
  id: string,
  paperProps: MDrawerProps["PaperProps"],
  paperSlotProps: PaperSlotProps,
): PaperSlotProps {
  return mergeSlotProps(
    { id },
    mergeSlotProps(
      paperSlotProps,
      mergeSlotProps(paperProps, { "aria-label": ARIA_LABEL.FILTERS }),
    ),
  );
}

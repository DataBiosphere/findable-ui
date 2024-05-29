import { TableCellProps as MTableCellProps } from "@mui/material/TableCell/TableCell";
import { CoreCell, CoreHeader } from "@tanstack/table-core";
import { ACCESSOR_KEYS } from "../../../../TableCreator/common/constants";

/**
 * Returns table cell padding based on the cell ID.
 * @param id - Cell ID.
 * @returns table cell padding.
 */
export function getTableCellPadding<T extends object, TValue>(
  id: CoreHeader<T, TValue>["id"] | CoreCell<T, TValue>["id"]
): MTableCellProps["padding"] {
  if (id === ACCESSOR_KEYS.SELECT) {
    return "checkbox";
  }
}

import { RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";
import { OutlineItem } from "../../../Layout/components/Outline/types";
import { ClassMeta } from "../Table/types";

/**
 * Returns outline items from class metadata.
 * @param table - Table instance.
 * @returns Outline items.
 */
export function buildClassesOutline<T extends RowData = Attribute>(
  table: Table<T>,
): OutlineItem[] {
  const meta = table.options.meta;
  if (!meta) return [];
  if (!("classMeta" in meta)) return [];
  return Object.entries(meta.classMeta as ClassMeta).map(
    ([classKey, { title }]) => {
      return {
        depth: 2,
        disabled: !hasGroupedRow(table, classKey),
        hash: classKey,
        value: title,
      };
    },
  );
}

/**
 * Returns true if a grouped row exists for a class key.
 * @param table - Table instance.
 * @param classKey - Class key.
 * @returns True if a grouped row exists, false otherwise.
 */
function hasGroupedRow<T extends RowData = Attribute>(
  table: Table<T>,
  classKey: string,
): boolean {
  const groupRow = table
    .getGroupedRowModel()
    .rows.find((row) => row.getValue("classKey") === classKey);
  return !!groupRow;
}

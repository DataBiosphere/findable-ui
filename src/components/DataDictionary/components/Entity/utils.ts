import { RowData, Table } from "@tanstack/react-table";
import { Attribute, Class } from "../../../../common/entities";
import { ClassMeta } from "../Table/types";

/**
 * Retrieves class metadata from the table options meta.
 * @param classKey - Class key.
 * @param table - Table instance.
 * @returns Class metadata or undefined.
 */
export function getClassMeta<T extends RowData = Attribute>(
  classKey: string | undefined,
  table: Table<T>
): Pick<Class<T>, "description" | "title"> | undefined {
  if (!classKey) return;

  // Grab the table meta and return if not defined.
  const meta = table.options.meta;
  if (!meta) return;

  // Return class metadata if defined.
  if ("classMeta" in meta) {
    return (meta.classMeta as ClassMeta)?.[classKey];
  }
}

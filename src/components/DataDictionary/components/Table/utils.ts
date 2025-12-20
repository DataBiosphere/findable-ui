import { RowData } from "@tanstack/react-table";
import { Attribute, Class } from "../../../../common/entities";
import { ClassMeta } from "./types";

/**
 * Builds class meta data from classes.
 * Metadata is used to display class title and description above each "grouped" table.
 * @param classes - Class entities.
 * @returns Class meta data.
 */
export const buildClassMeta = <T extends RowData = Attribute>(
  classes: Class<T>[],
): ClassMeta => {
  return Object.fromEntries(
    classes.map(({ description, name, title }) => [
      name,
      { description, title },
    ]),
  );
};

/**
 * Builds table data from classes.
 * RowData contains attributes of a class and a classKey property `Class["name"]` to identify the class the row belongs to.
 * `classKey` is used to group rows by class.
 * @param classes - Class entities.
 * @returns Table data.
 */
export const buildTableData = <T extends RowData = Attribute>(
  classes: Class<T>[],
): T[] => {
  return classes
    .map(({ attributes, name: classKey }) =>
      attributes.map((attribute) => ({
        ...(attribute as unknown as Attribute),
        classKey,
      })),
    )
    .flat() as T[];
};

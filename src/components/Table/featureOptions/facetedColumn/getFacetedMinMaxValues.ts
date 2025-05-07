import { getMemoOptions, memo, RowData, Table } from "@tanstack/react-table";

/**
 * Returns an array of two numbers, the minimum and maximum values for the column, or undefined if the column does not exist or has no values.
 * Customized version of the default getFacetedMinMaxValues function from tanstack table handling mixed null and possible NaN values.
 * See https://tanstack.com/table/v8/docs/api/features/column-faceting#getfacetedminmaxvalues.
 * @returns An array of two numbers, the minimum and maximum values for the column, or undefined if the column does not exist or has no values.
 */
export function getFacetedMinMaxValues<TData extends RowData>(): (
  table: Table<TData>,
  columnId: string
) => () => undefined | [number, number] {
  // eslint-disable-next-line sonarjs/cognitive-complexity -- Customized copy of tanstack table function.
  return (table, columnId) =>
    memo(
      () => [table.getColumn(columnId)?.getFacetedRowModel()],
      (facetedRowModel) => {
        if (!facetedRowModel) return undefined;

        // Initialize with the smallest and largest possible numbers.
        const facetedMinMaxValues: [number, number] = [Infinity, -Infinity];

        for (let i = 0; i < facetedRowModel.flatRows.length; i++) {
          const values =
            facetedRowModel.flatRows[i]!.getUniqueValues<number>(columnId);

          for (let j = 0; j < values.length; j++) {
            const value = values[j]!;
            // Convert value to a number.
            const numericValue = Number(value);

            // Skip null and NaN values.
            if (value === null || isNaN(numericValue)) continue;

            if (numericValue < facetedMinMaxValues[0]) {
              facetedMinMaxValues[0] = numericValue;
            } else if (numericValue > facetedMinMaxValues[1]) {
              facetedMinMaxValues[1] = numericValue;
            }
          }
        }

        return facetedMinMaxValues;
      },
      getMemoOptions(table.options, "debugTable", "getFacetedMinMaxValues")
    );
}

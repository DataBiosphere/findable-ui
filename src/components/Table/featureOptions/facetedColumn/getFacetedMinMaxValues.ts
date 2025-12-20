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
  return (table, columnId) =>
    memo(
      () => [table.getColumn(columnId)?.getFacetedRowModel()],
      // eslint-disable-next-line sonarjs/cognitive-complexity -- Customized copy of tanstack table function.
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
            }
            if (numericValue > facetedMinMaxValues[1]) {
              facetedMinMaxValues[1] = numericValue;
            }
          }
        }

        // Return undefined if all values are null or NaN.
        if (
          facetedMinMaxValues[0] === Infinity &&
          facetedMinMaxValues[1] === -Infinity
        ) {
          return undefined;
        }

        // Normalize -0 to 0.
        if (Object.is(facetedMinMaxValues[0], -0)) {
          facetedMinMaxValues[0] = 0;
        }
        if (Object.is(facetedMinMaxValues[1], -0)) {
          facetedMinMaxValues[1] = 0;
        }

        return facetedMinMaxValues;
      },
      getMemoOptions(table.options, "debugTable", "getFacetedMinMaxValues")
    );
}

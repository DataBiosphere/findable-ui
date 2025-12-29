import { memo, RowData, Table } from "@tanstack/react-table";

/**
 * Returns unique category term counts keyed by category terms.
 * Custom function based off react table function getFacetedUniqueValues, see
 * https://tanstack.com/table/v8/docs/api/features/filters#getfaceteduniquevalues, and
 * https://github.com/TanStack/table/blob/6d4a91e74676da0b28fe07fcc1b7d26f535db0f4/packages/table-core/src/utils/getFacetedUniqueValues.ts.
 * @returns Unique category term counts keyed by category terms.
 */
export function getFacetedUniqueValues<T extends RowData>(): (
  table: Table<T>,
  columnId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type matches react table getFacetedUniqueValues return type see https://github.com/TanStack/table/blob/6d4a91e74676da0b28fe07fcc1b7d26f535db0f4/packages/table-core/src/utils/getFacetedUniqueValues.ts.
) => () => Map<any, number> {
  return (table, columnId) =>
    memo(
      () => [table.getColumn(columnId)?.getFacetedRowModel()],
      (facetedRowModel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type matches react table getFacetedUniqueValues return type.
        const facetedUniqueValues = new Map<any, number>();
        if (facetedRowModel) {
          for (let i = 0; i < facetedRowModel.flatRows.length; i++) {
            const value = facetedRowModel?.flatRows[i]?.getValue(columnId);
            if (Array.isArray(value)) {
              value.map((val) => {
                updateCountByTerms(facetedUniqueValues, val);
              });
            } else {
              updateCountByTerms(facetedUniqueValues, value);
            }
          }
        }
        return facetedUniqueValues;
      },
      {
        debug: () => table.options.debugAll ?? table.options.debugTable,
        key:
          process.env.NODE_ENV === "development" &&
          "getFacetedUniqueValues_" + columnId,
        // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default.
        onChange: () => {},
      },
    );
}

/**
 * Adds or updates the map object category term count keyed by category term.
 * @param countByTerms - Category term count keyed by category term.
 * @param term - Category term.
 */
function updateCountByTerms(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type matches react table getFacetedUniqueValues return type see https://github.com/TanStack/table/blob/6d4a91e74676da0b28fe07fcc1b7d26f535db0f4/packages/table-core/src/utils/getFacetedUniqueValues.ts.
  countByTerms: Map<any, number>,
  term: unknown,
): void {
  if (countByTerms.has(term)) {
    countByTerms.set(term, (countByTerms.get(term) ?? 0) + 1);
  } else {
    countByTerms.set(term, 1);
  }
}

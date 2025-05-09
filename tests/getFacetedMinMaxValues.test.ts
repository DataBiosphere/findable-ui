import { Row, RowData, RowModel, Table } from "@tanstack/react-table";
import { getFacetedMinMaxValues } from "../src/components/Table/featureOptions/facetedColumn/getFacetedMinMaxValues";

describe("getFacetedMinMaxValues", () => {
  test.each([
    {
      expected: [10, 30],
      name: "returns correct min and max for all valid numbers",
      rows: [makeRow([10]), makeRow([20]), makeRow([30])],
    },
    {
      expected: [5, 100],
      name: "skips null and NaN values",
      rows: [
        makeRow([null]),
        makeRow([15, NaN]),
        makeRow([5, 25]),
        makeRow([undefined, 100]),
      ],
    },
    {
      expected: [10, 30],
      name: "skips non-numeric strings and includes numeric strings",
      rows: [makeRow(["10", "not-a-number"]), makeRow([20]), makeRow(["30"])],
    },
    {
      expected: undefined,
      name: "returns undefined if all values are null or NaN",
      rows: [
        makeRow([null]),
        makeRow([undefined]),
        makeRow([NaN]),
        makeRow([null, NaN]),
      ],
    },
    {
      expected: [-1000, 50000],
      name: "handles negative, zero, and large numbers",
      rows: [makeRow([-1000]), makeRow([0]), makeRow([50000]), makeRow([42])],
    },
    {
      expected: [10, 60],
      name: "computes min and max across multiple values per row",
      rows: [makeRow([10, 20]), makeRow([30, 40]), makeRow([50, 60])],
    },
    {
      expected: [10, 60],
      name: "computes min and max across mixed arrays with null, undefined, and non-numeric value",
      rows: [
        makeRow([10, null, 20]),
        makeRow([30, undefined, 40]),
        makeRow([50, 60, "not-a-number"]),
        makeRow([null, null, null]),
      ],
    },
    {
      expected: [10, 10],
      name: "returns [value, value] for a single row/value",
      rows: [makeRow([10])],
    },
    {
      expected: undefined,
      name: "returns undefined if all rows are empty arrays",
      rows: [makeRow([]), makeRow([])],
    },
    {
      expected: undefined,
      name: "returns undefined if all values are non-numeric strings",
      rows: [makeRow(["foo"]), makeRow(["bar"]), makeRow(["baz"])],
    },
    {
      expected: [0, 0],
      name: "handles negative zero correctly",
      rows: [makeRow([-0]), makeRow([0]), makeRow([0])],
    },
    {
      expected: [-Infinity, Infinity],
      name: "handles Infinity and -Infinity as values",
      rows: [makeRow([Infinity]), makeRow([-Infinity]), makeRow([10])],
    },
    {
      expected: [0, 42],
      name: "handles mixed valid and invalid types",
      rows: [makeRow([null, "5", {}, [], 42, undefined, "abc", 0])],
    },
    {
      expected: undefined,
      name: "returns undefined for no rows",
      rows: [],
    },
  ])("$name", ({ expected, rows }) => {
    const COLUMN_ID = "columnId";
    const result = getExpected(makeTable(rows, COLUMN_ID), COLUMN_ID);
    expect(result).toEqual(expected);
  });

  it("returns undefined if column does not exist", () => {
    const COLUMN_ID = "missing";
    const ROWS = [makeRow([1]), makeRow([2])];
    const expected = getExpected(makeTable(ROWS, "foo"), COLUMN_ID);
    expect(expected).toBeUndefined();
  });

  it("returns undefined if facetedRowModel is undefined", () => {
    const COLUMN_ID = "foo";
    const table = {
      getColumn: (): {
        getFacetedRowModel: () => RowModel<RowData> | undefined;
      } => ({
        getFacetedRowModel: (): undefined => undefined,
      }),
    } as unknown as Table<RowData>;
    const expected = getExpected(table, COLUMN_ID);
    expect(expected).toBeUndefined();
  });
});

/**
 * Helper function to get the expected result from the getFacetedMinMaxValues function.
 * @param table - The table to get the expected result from.
 * @param columnId - The column id to get the expected result from.
 * @returns The expected result from the getFacetedMinMaxValues function.
 */
function getExpected(
  table: Table<RowData>,
  columnId: string
): [number, number] | undefined {
  return getFacetedMinMaxValues()(table, columnId)();
}

/**
 * Helper function to create a faceted row model.
 * @param rows - The rows to create the faceted row model from.
 * @returns The faceted row model.
 */
function makeFacetedRowModel(rows: Row<RowData>[]): RowModel<RowData> {
  return {
    flatRows: rows,
  } as unknown as RowModel<RowData>;
}

/**
 * Helper function to create a row with a specific set of values.
 * @param values - The values to set for the row.
 * @returns The row.
 */
function makeRow(values: unknown[]): Row<RowData> {
  return {
    getUniqueValues: <TValue>() => values as TValue[],
  } as unknown as Row<RowData>;
}

/**
 * Helper function to create a table with a specific set of rows.
 * @param rows - The rows to set for the table.
 * @param columnId - The column id to set for the table.
 * @returns The table.
 */
function makeTable(rows: Row<RowData>[], columnId: string): Table<RowData> {
  return {
    getColumn: (id: string) =>
      id === columnId
        ? { getFacetedRowModel: () => makeFacetedRowModel(rows) }
        : undefined,
  } as unknown as Table<RowData>;
}

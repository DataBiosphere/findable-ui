import {
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { renderHook } from "@testing-library/react";
import { isSelectCategoryView } from "../src/common/categories/views/select/typeGuards";
import type { SelectCategoryValueView } from "../src/common/entities";
import { FILTER_SORT } from "../src/common/filters/sort/config/types";
import { buildColumnFilters } from "../src/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/utils";

interface Row {
  ancestry: string;
}

// Terms a to c tie on count and are in the reverse order of their labels.
const LABELS: Record<string, string> = {
  a: "Zebra",
  b: "Mango",
  c: "Apple",
  d: "Kiwi",
};

const DATA: Row[] = [
  { ancestry: "a" },
  { ancestry: "b" },
  { ancestry: "c" },
  { ancestry: "d" },
  { ancestry: "d" },
];

describe("buildColumnFilters", () => {
  it.each([
    [FILTER_SORT.ALPHA, ["Apple", "Kiwi", "Mango", "Zebra"]],
    [FILTER_SORT.COUNT, ["Kiwi", "Apple", "Mango", "Zebra"]],
  ])("sorts %s by the mapped label", (filterSort, expected) => {
    const table = renderTable();

    const [categoryFilter] = buildColumnFilters(table, filterSort);
    const [categoryView] = categoryFilter.categoryViews;

    if (!isSelectCategoryView(categoryView)) throw new Error("Not select");
    expect(categoryView.values.map(({ label }) => label)).toEqual(expected);
  });
});

/**
 * Maps a value's term to its label.
 * @param value - Select category value view.
 * @returns The value view with its label.
 */
function mapLabel(value: SelectCategoryValueView): SelectCategoryValueView {
  return { ...value, label: LABELS[value.label] ?? value.label };
}

/**
 * Renders a table whose only column filter maps its terms to labels.
 * @returns Table.
 */
function renderTable(): ReturnType<typeof useReactTable<Row>> {
  const columnHelper = createColumnHelper<Row>();
  const { result } = renderHook(() =>
    useReactTable<Row>({
      columns: [
        columnHelper.accessor("ancestry", {
          filterFn: "arrIncludesSome",
          header: "Ancestry",
        }),
      ],
      data: DATA,
      getCoreRowModel: getCoreRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFilteredRowModel: getFilteredRowModel(),
      meta: {
        categoryGroups: [
          {
            categoryConfigs: [
              {
                key: "ancestry",
                label: "Ancestry",
                mapSelectCategoryValue: mapLabel,
              },
            ],
            label: "",
          },
        ],
      },
    }),
  );
  return result.current;
}

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
import {
  initFilterSort,
  isFilterSortEnabled,
} from "../src/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/hooks/UseUpdateFilterSort/utils";
import { pinLastCompare } from "../src/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/stories/utils";
import type { ColumnFiltersTableMeta } from "../src/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/types";
import { buildColumnFilters } from "../src/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/utils";

interface Row {
  ancestry: string;
}

type Table = ReturnType<typeof useReactTable<Row>>;

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
    const table = renderTable(DATA, { categoryGroups: CATEGORY_GROUPS });

    expect(getLabels(buildColumnFilters(table, filterSort))).toEqual(expected);
  });

  it.each([
    [
      FILTER_SORT.ALPHA,
      ["Kiwi", "Mango", "Zebra", "unspecified", "not_applicable"],
    ],
    [
      FILTER_SORT.COUNT,
      ["Mango", "Kiwi", "Zebra", "unspecified", "not_applicable"],
    ],
  ])("sorts %s with the table meta's comparator", (filterSort, expected) => {
    // Without the comparator, unspecified and not_applicable are not last in either sort.
    const table = renderTable(
      buildRows({ a: 1, b: 2, d: 1, not_applicable: 2, unspecified: 3 }),
      {
        categoryGroups: CATEGORY_GROUPS,
        filterSort: { compare: pinLastCompare, sortBy: FILTER_SORT.ALPHA },
      },
    );

    expect(getLabels(buildColumnFilters(table, filterSort))).toEqual(expected);
  });

  it.each([
    [FILTER_SORT.ALPHA, ["Apple", "Zebra", "unspecified"]],
    [FILTER_SORT.COUNT, ["Zebra", "Apple", "unspecified"]],
  ])(
    "sorts %s with the comparator when only one pinned term is present",
    (filterSort, expected) => {
      // Without the comparator, unspecified is not last in either sort.
      const table = renderTable(buildRows({ a: 2, c: 1, unspecified: 5 }), {
        categoryGroups: CATEGORY_GROUPS,
        filterSort: { compare: pinLastCompare },
      });

      expect(getLabels(buildColumnFilters(table, filterSort))).toEqual(
        expected,
      );
    },
  );
});

describe("column filters sort from the table meta", () => {
  it.each([
    [undefined, FILTER_SORT.ALPHA, false],
    [FILTER_SORT.COUNT, FILTER_SORT.COUNT, true],
    [{ sortBy: FILTER_SORT.COUNT }, FILTER_SORT.COUNT, true],
    [{ compare: pinLastCompare }, FILTER_SORT.ALPHA, false],
    [
      { compare: pinLastCompare, sortBy: FILTER_SORT.COUNT },
      FILTER_SORT.COUNT,
      true,
    ],
  ])(
    "reads filterSort %p as initial sort %s, enabled %s",
    (filterSort, expectedSort, expectedEnabled) => {
      const table = renderTable(DATA, { filterSort });

      expect(initFilterSort(table)).toBe(expectedSort);
      expect(isFilterSortEnabled(table)).toBe(expectedEnabled);
    },
  );
});

const CATEGORY_GROUPS: ColumnFiltersTableMeta<Row>["categoryGroups"] = [
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
];

/**
 * Builds rows with each term repeated by its count.
 * @param counts - Count by term.
 * @returns Rows.
 */
function buildRows(counts: Record<string, number>): Row[] {
  return Object.entries(counts).flatMap(([ancestry, count]) =>
    Array.from({ length: count }, () => ({ ancestry })),
  );
}

/**
 * Returns the value labels of the only column filter.
 * @param categoryFilters - Category filters.
 * @returns Value labels.
 */
function getLabels(
  categoryFilters: ReturnType<typeof buildColumnFilters>,
): string[] {
  const [categoryFilter] = categoryFilters;
  const [categoryView] = categoryFilter.categoryViews;

  if (!isSelectCategoryView(categoryView)) throw new Error("Not select");
  return categoryView.values.map(({ label }) => label);
}

/**
 * Maps a value's term to its label.
 * @param value - Select category value view.
 * @returns The value view with its label.
 */
function mapLabel(value: SelectCategoryValueView): SelectCategoryValueView {
  return { ...value, label: LABELS[value.label] ?? value.label };
}

/**
 * Renders a table with an ancestry column filter.
 * @param data - Rows.
 * @param meta - Table meta.
 * @returns Table.
 */
function renderTable(data: Row[], meta: ColumnFiltersTableMeta<Row>): Table {
  const columnHelper = createColumnHelper<Row>();
  const { result } = renderHook(() =>
    useReactTable<Row>({
      columns: [
        columnHelper.accessor("ancestry", {
          filterFn: "arrIncludesSome",
          header: "Ancestry",
        }),
      ],
      data,
      getCoreRowModel: getCoreRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFilteredRowModel: getFilteredRowModel(),
      meta,
    }),
  );
  return result.current;
}

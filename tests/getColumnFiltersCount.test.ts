import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { renderHook } from "@testing-library/react";
import { VIEW_KIND } from "../src/common/categories/views/types";
import type { ColumnFiltersTableMeta } from "../src/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/types";
import { getColumnFiltersCount } from "../src/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/utils";
import type { CategoryGroup } from "../src/config/entities";

interface Row {
  ancestry: string;
  readCount: number;
}

type Table = ReturnType<typeof useReactTable<Row>>;

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    categoryConfigs: [
      { key: "ancestry", label: "Ancestry" },
      { key: "readCount", label: "Read Count", viewKind: VIEW_KIND.RANGE },
    ],
  },
];

describe("getColumnFiltersCount", () => {
  it("counts a range filter once and each selected select value", () => {
    const table = renderTable(
      [
        { id: "ancestry", value: ["a", "b", "c"] },
        { id: "readCount", value: [10, 20] },
      ],
      { categoryGroups: CATEGORY_GROUPS },
    );

    expect(getColumnFiltersCount(table)).toBe(4);
  });

  it("counts a half-open range filter once", () => {
    const table = renderTable([{ id: "readCount", value: [10, null] }], {
      categoryGroups: CATEGORY_GROUPS,
    });

    expect(getColumnFiltersCount(table)).toBe(1);
  });

  it("counts each value when the table has no category groups", () => {
    const table = renderTable(
      [
        { id: "ancestry", value: ["a", "b", "c"] },
        { id: "readCount", value: [10, 20] },
      ],
      {},
    );

    expect(getColumnFiltersCount(table)).toBe(5);
  });
});

/**
 * Renders a table with the given column filters and meta.
 * @param columnFilters - Column filters state.
 * @param meta - Table meta.
 * @returns Table.
 */
function renderTable(
  columnFilters: ColumnFiltersState,
  meta: ColumnFiltersTableMeta<Row>,
): Table {
  const columnHelper = createColumnHelper<Row>();
  const { result } = renderHook(() =>
    useReactTable<Row>({
      columns: [
        columnHelper.accessor("ancestry", { header: "Ancestry" }),
        columnHelper.accessor("readCount", { header: "Read Count" }),
      ],
      data: [],
      getCoreRowModel: getCoreRowModel(),
      initialState: { columnFilters },
      meta,
    }),
  );
  return result.current;
}

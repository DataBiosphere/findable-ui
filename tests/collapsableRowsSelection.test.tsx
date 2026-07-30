import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { fireEvent, render, screen } from "@testing-library/react";
import { JSX, useState } from "react";
import { CollapsableRows } from "../src/components/Table/components/TableRows/components/CollapsableRows/collapsableRows";
import { ROW_PREVIEW } from "../src/components/Table/features/RowPreview/constants";

interface RowData {
  group: string;
  name: string;
}

// Three rows in one group, so a sub-row can be some-but-not-all selected — the
// case the binary memo props couldn't distinguish (1 vs 2 selected).
const DATA: RowData[] = [
  { group: "A", name: "a1" },
  { group: "A", name: "a2" },
  { group: "A", name: "a3" },
];

// Stable references so they never perturb the CollapsableTableRow memo: a
// new grouping array would rebuild the grouped row model (fresh `row` objects),
// and a new measureElement would change a compared prop — either would re-render
// the card regardless of the selection signature and mask a broken memo key.
const GROUPING = ["group"];
const measureElement = (): undefined => undefined;

const columnHelper = createColumnHelper<RowData>();

const COLUMNS = [
  columnHelper.display({
    cell: ({ row }) => (
      <input
        aria-label={`select ${row.original.name}`}
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        type="checkbox"
      />
    ),
    id: "select",
  }),
  columnHelper.accessor("group", { header: "Group" }),
  columnHelper.accessor("name", { header: "Name" }),
];

/**
 * Renders a grouped collapsable table body so a grouped card draws its
 * sub-rows' checkboxes (via CollapsableCell). Row selection is React state, so
 * a toggle re-renders CollapsableRows and re-computes the memo's
 * subRowSelectionSignature.
 * @returns Grouped collapsable table.
 */
function TestTable(): JSX.Element {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable<RowData>({
    _features: [ROW_PREVIEW],
    columns: COLUMNS,
    data: DATA,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { expanded: true, grouping: GROUPING, rowSelection },
  });
  const rows = table.getRowModel().rows;
  // Stub virtualizer that renders every row (the real one measures a scroll
  // container that doesn't exist in jsdom). `measureElement` is the only
  // virtualizer value passed into the memoized row, and it's a stable
  // module-level reference so it can't defeat the memo.
  const virtualizer = {
    getVirtualItems: () => rows.map((_, index) => ({ index, key: index })),
    measureElement,
  } as unknown as Virtualizer<HTMLDivElement, Element>;
  return (
    <table>
      <tbody>
        <CollapsableRows
          rows={rows}
          tableInstance={table}
          virtualizer={virtualizer}
        />
      </tbody>
    </table>
  );
}

describe("CollapsableRows - grouped mobile sub-row selection", () => {
  it("reflects each sub-row's checkbox as selections toggle (memo wiring)", () => {
    render(<TestTable />);
    const a1 = screen.getByLabelText("select a1") as HTMLInputElement;
    const a2 = screen.getByLabelText("select a2") as HTMLInputElement;

    expect(a1.checked).toBe(false);
    expect(a2.checked).toBe(false);

    // First selection.
    fireEvent.click(a1);
    expect(a1.checked).toBe(true);

    // Second selection — the regression this guards: with the memo key removed,
    // the grouped card wouldn't re-render here and a2 would stay unchecked.
    fireEvent.click(a2);
    expect(a1.checked).toBe(true);
    expect(a2.checked).toBe(true);

    // Deselect one of two.
    fireEvent.click(a1);
    expect(a1.checked).toBe(false);
    expect(a2.checked).toBe(true);
  });
});

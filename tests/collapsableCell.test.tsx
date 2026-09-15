import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fireEvent, render, screen } from "@testing-library/react";
import { JSX } from "react";
import { CollapsableCell } from "../src/components/Table/components/TableCell/components/CollapsableCell/collapsableCell";
import { ARIA_LABEL } from "../src/components/Table/components/TableCell/components/CollapsableCell/constants";

interface RowData {
  name: string;
  organism: string;
}

// Mirrors an Azul response, where the row's identifier sits inside an array and
// the pinned column renders it through a view builder.
interface ResponseRowData {
  files: { name: string }[];
}

const ROW: RowData = { name: "Sample 123", organism: "Homo sapiens" };
const RESPONSE_ROW: ResponseRowData = { files: [{ name: "sample_file.bam" }] };

const TOGGLE_NAME = `${ARIA_LABEL.ROW_DETAILS} ${ROW.name}`;
const RESPONSE_TOGGLE_NAME = `${ARIA_LABEL.ROW_DETAILS} ${RESPONSE_ROW.files[0].name}`;

const columnHelper = createColumnHelper<RowData>();
const responseColumnHelper = createColumnHelper<ResponseRowData>();

const COLUMNS = [
  columnHelper.accessor("name", {
    header: "Name",
    meta: { columnPinned: true },
  }),
  columnHelper.accessor("organism", { header: "Organism" }),
];

// The accessor resolves to the files array, never to a string: the identifier
// the user reads exists only in the cell's rendered output.
const RESPONSE_COLUMNS = [
  responseColumnHelper.accessor("files", {
    cell: (info) => info.getValue()[0].name,
    header: "Name",
    meta: { columnPinned: true },
  }),
];

/**
 * Renders a single collapsable cell, with expansion driven by the table's own
 * state so the toggle round-trips as it does in an app. The cell renders a
 * `td`, so it is wrapped in table markup to keep the DOM valid.
 * @param props - Component props.
 * @param props.columns - Column definitions, one of which is pinned.
 * @param props.data - Rows to render.
 * @param props.isDisabled - Whether the row toggle is disabled.
 * @returns Collapsable cell under test.
 */
function TestCell<T>({
  columns,
  data,
  isDisabled = false,
}: {
  // any matches useReactTable's own column value type.
  columns: ColumnDef<T, any>[];
  data: T[];
  isDisabled?: boolean;
}): JSX.Element {
  const table = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });
  return (
    <table>
      <tbody>
        <tr>
          <CollapsableCell
            isDisabled={isDisabled}
            row={table.getRowModel().rows[0]}
          />
        </tr>
      </tbody>
    </table>
  );
}

/**
 * Renders the cell whose pinned column resolves to the row's identifier.
 * @param isDisabled - Whether the row toggle is disabled.
 */
function renderCell(isDisabled = false): void {
  render(<TestCell columns={COLUMNS} data={[ROW]} isDisabled={isDisabled} />);
}

describe("CollapsableCell", () => {
  it("should name the row toggle after the pinned cell", () => {
    renderCell();
    expect(screen.getByRole("button", { name: TOGGLE_NAME })).not.toBeNull();
  });

  // The regression this naming exists to avoid: config-driven columns render
  // through a view builder, so the accessor value is routinely a non-scalar
  // while the identifier the user reads lives only in the rendered output.
  // Naming from the accessor left every toggle in those tables on the bare
  // fallback, which is indistinguishable row to row.
  it("should name the toggle from the rendered cell, not the accessor value", () => {
    render(<TestCell columns={RESPONSE_COLUMNS} data={[RESPONSE_ROW]} />);
    expect(
      screen.getByRole("button", { name: RESPONSE_TOGGLE_NAME }),
    ).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: ARIA_LABEL.ROW_DETAILS }),
    ).toBeNull();
  });

  // The name must stay put across activation: aria-expanded is what conveys the
  // state, and a name that changes on click moves the target out from under
  // anyone addressing the control by name.
  it("should keep the toggle's name while aria-expanded flips", () => {
    renderCell();
    const toggle = screen.getByRole("button", { name: TOGGLE_NAME });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: TOGGLE_NAME })).toBe(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
  });

  // A disabled row cannot open, so advertising a disclosure state would
  // describe an interaction that is not offered.
  it("should omit aria-expanded while the toggle is disabled", () => {
    renderCell(true);
    const toggle = screen.getByRole("button", { name: TOGGLE_NAME });
    expect(toggle.hasAttribute("aria-expanded")).toBe(false);
    expect(toggle.hasAttribute("disabled")).toBe(true);
  });
});

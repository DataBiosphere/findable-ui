import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fireEvent, render, screen } from "@testing-library/react";
import { JSX } from "react";
import { CollapsableCell } from "../src/components/Table/components/TableCell/components/CollapsableCell/collapsableCell";

interface RowData {
  name: string;
  organism: string;
}

const ROW: RowData = { name: "Sample 123", organism: "Homo sapiens" };

const SECOND_ROW: RowData = { name: "Sample 456", organism: "Mus musculus" };

const TOGGLE_NAME = `Row details: ${ROW.name}`;

const columnHelper = createColumnHelper<RowData>();

const COLUMNS = [
  columnHelper.accessor("name", {
    header: "Name",
    meta: { columnPinned: true },
  }),
  columnHelper.accessor("organism", { header: "Organism" }),
];

/**
 * Renders a single collapsable cell whose pinned column carries the row's
 * identifier, with expansion driven by the table's own state so the toggle
 * round-trips as it does in an app. The cell renders a `td`, so it is wrapped
 * in table markup to keep the DOM valid.
 * @returns Collapsable cell under test.
 */
function TestCell(): JSX.Element {
  const table = useReactTable<RowData>({
    columns: COLUMNS,
    data: [ROW],
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });
  return (
    <table>
      <tbody>
        <tr>
          <CollapsableCell row={table.getRowModel().rows[0]} />
        </tr>
      </tbody>
    </table>
  );
}

/**
 * Renders a collapsable cell per row, so the ids the cells generate can be
 * compared across rows.
 * @returns Collapsable cells under test.
 */
function TestCells(): JSX.Element {
  const table = useReactTable<RowData>({
    columns: COLUMNS,
    data: [ROW, SECOND_ROW],
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });
  return (
    <table>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            <CollapsableCell row={row} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

describe("CollapsableCell", () => {
  it("should name the row toggle after the pinned cell's value", () => {
    render(<TestCell />);
    expect(screen.getByRole("button", { name: TOGGLE_NAME })).not.toBeNull();
  });

  // The name must stay put across activation: aria-expanded is what conveys the
  // state, and a name that changes on click moves the target out from under
  // anyone addressing the control by name.
  it("should keep the toggle's name while aria-expanded flips", () => {
    render(<TestCell />);
    const toggle = screen.getByRole("button", { name: TOGGLE_NAME });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: TOGGLE_NAME })).toBe(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
  });

  // Collapse keeps its children mounted, so unlike the popup triggers this
  // reference holds in both states.
  it("should point the toggle at the collapsed contents in both states", () => {
    render(<TestCell />);
    const toggle = screen.getByRole("button", { name: TOGGLE_NAME });
    const contentsId = toggle.getAttribute("aria-controls") as string;

    expect(contentsId).toBeTruthy();
    expect(document.getElementById(contentsId)).not.toBeNull();

    fireEvent.click(toggle);

    expect(toggle.getAttribute("aria-controls")).toBe(contentsId);
    expect(document.getElementById(contentsId)).not.toBeNull();
  });

  // Every row renders a toggle, so a shared id would leave them all pointing at
  // the first row's contents.
  it("should give each row's toggle its own contents id", () => {
    render(<TestCells />);
    const [first, second] = screen.getAllByRole("button", {
      name: /^Row details:/,
    });
    expect(first.getAttribute("aria-controls")).not.toBe(
      second.getAttribute("aria-controls"),
    );
  });
});

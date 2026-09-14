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
});

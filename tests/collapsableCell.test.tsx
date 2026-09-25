import {
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

const ROWS: RowData[] = [
  { name: "Sample 123", organism: "Homo sapiens" },
  { name: "Sample 456", organism: "Mus musculus" },
];

// The first of the two test rows, counted from one.
const TOGGLE_NAME = `${ARIA_LABEL.ROW_DETAILS}: 1`;

const columnHelper = createColumnHelper<RowData>();

const COLUMNS = [
  columnHelper.accessor("name", {
    header: "Name",
    meta: { columnPinned: true },
  }),
  columnHelper.accessor("organism", { header: "Organism" }),
];

/**
 * Renders a collapsable cell per row, with expansion driven by the table's own
 * state so the toggle round-trips as it does in an app. The cell renders a
 * `td`, so it is wrapped in table markup to keep the DOM valid.
 * @param props - Component props.
 * @param props.isDisabled - Whether the row toggles are disabled.
 * @param props.subset - Whether to render only the rows after the first, as a mini-table would.
 * @returns Collapsable cells under test.
 */
function TestCell({
  isDisabled = false,
  subset = false,
}: {
  isDisabled?: boolean;
  subset?: boolean;
}): JSX.Element {
  const table = useReactTable<RowData>({
    columns: COLUMNS,
    data: ROWS,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });
  return (
    <table>
      <tbody>
        {(subset
          ? table.getRowModel().rows.slice(1)
          : table.getRowModel().rows
        ).map((row, position) => (
          <tr key={row.id}>
            <CollapsableCell
              isDisabled={isDisabled}
              position={position}
              row={row}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

describe("CollapsableCell", () => {
  it("should name the row toggle after the row's number", () => {
    render(<TestCell />);
    expect(screen.getByRole("button", { name: TOGGLE_NAME })).not.toBeNull();
  });

  // The point of numbering: a bare "Row details" on every row is
  // indistinguishable in a screen reader's element list.
  it("should give every row's toggle a distinct name", () => {
    render(<TestCell />);
    const names = screen
      .getAllByRole("button")
      .map((button) => button.getAttribute("aria-label"));
    expect(names).toHaveLength(ROWS.length);
    expect(new Set(names).size).toBe(ROWS.length);
  });

  // A mini-table renders a subset of the table's rows, whose `row.index` is
  // their position in the whole dataset. The name should count what is
  // rendered, so the caller's render position wins over `row.index`.
  it("should number the toggle by its rendered position, not row.index", () => {
    render(<TestCell subset />);
    const names = screen
      .getAllByRole("button")
      .map((button) => button.getAttribute("aria-label"));
    expect(names).toEqual([TOGGLE_NAME]);
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

  // A disabled row cannot open, so advertising a disclosure state or a
  // controlled region would describe an interaction that is not offered.
  it("should omit aria-expanded and aria-controls while the toggle is disabled", () => {
    render(<TestCell isDisabled />);
    const toggle = screen.getByRole("button", { name: TOGGLE_NAME });
    expect(toggle.hasAttribute("aria-expanded")).toBe(false);
    expect(toggle.hasAttribute("aria-controls")).toBe(false);
    expect(toggle.hasAttribute("disabled")).toBe(true);
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
    render(<TestCell />);
    const [first, second] = screen.getAllByRole("button", {
      name: /^Row details:/,
    });
    expect(first.getAttribute("aria-controls")).not.toBe(
      second.getAttribute("aria-controls"),
    );
  });
});

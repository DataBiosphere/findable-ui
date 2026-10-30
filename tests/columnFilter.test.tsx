import {
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { JSX } from "react";
import { ColumnFilter } from "../src/components/Table/components/TableFeatures/ColumnFilter/columnFilter";

interface Row {
  organism: string;
}

const DATA: Row[] = [
  { organism: "Homo sapiens" },
  { organism: "Mus musculus" },
];

const TRIGGER_NAME = /Organism/;

/**
 * Renders a column filter over a column with facetable values, which is the
 * only state in which its trigger is enabled.
 * @param props - Test props.
 * @param props.data - Table rows; empty rows leave the trigger disabled.
 * @returns Column filter under test.
 */
function TestColumnFilter({ data = DATA }: { data?: Row[] }): JSX.Element {
  const columnHelper = createColumnHelper<Row>();
  const table = useReactTable<Row>({
    columns: [
      columnHelper.accessor("organism", {
        filterFn: "arrIncludesSome",
        header: "Organism",
      }),
    ],
    data,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return <ColumnFilter column={table.getAllColumns()[0]} />;
}

/**
 * Renders the column filter and opens its panel.
 * @returns The trigger and the open panel.
 */
function openPanel(): { panel: HTMLElement; trigger: HTMLElement } {
  render(<TestColumnFilter />);
  const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
  fireEvent.click(trigger);
  return { panel: screen.getByRole("dialog", { name: "Organism" }), trigger };
}

/**
 * Waits for the click-away listener to activate: MUI ClickAwayListener starts
 * listening a tick after it mounts, so the opening click does not close it.
 */
async function waitForClickAway(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe("ColumnFilter", () => {
  it("should declare that the trigger opens a dialog", () => {
    render(<TestColumnFilter />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("should open a dialog, named after the column, that the trigger controls", () => {
    const { panel, trigger } = openPanel();
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(panel.id);
  });

  // With no faceted values the trigger is disabled and cannot open, so it
  // announces no expanded state or controlled panel.
  it("should omit expanded state and controls while disabled", () => {
    render(<TestColumnFilter data={[]} />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(trigger.hasAttribute("aria-expanded")).toBe(false);
    expect(trigger.hasAttribute("aria-controls")).toBe(false);
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
  });

  it("should toggle a value in the column filter when it is selected", () => {
    const { panel } = openPanel();
    const value = (): HTMLInputElement =>
      panel.querySelector("input[type='checkbox']") as HTMLInputElement;

    fireEvent.click(screen.getByText("Homo sapiens"));
    expect(value().checked).toBe(true);

    fireEvent.click(screen.getByText("Homo sapiens"));
    expect(value().checked).toBe(false);
  });

  // Focus stays on the trigger, outside the panel; Escape is handled app-wide
  // while the panel is open.
  it("should close on Escape and return focus to the trigger", () => {
    const { trigger } = openPanel();
    trigger.focus();

    fireEvent.keyDown(trigger, { key: "Escape" });

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  it("should move focus to the first value when the panel opens", () => {
    const { panel } = openPanel();
    expect(document.activeElement).toBe(panel.querySelector('[role="button"]'));
    expect(document.activeElement?.textContent).toContain("Homo sapiens");
  });

  // A press away from the panel closes it; the click still reaches its target.
  it("should close on a press outside the panel", async () => {
    const { trigger } = openPanel();
    await waitForClickAway();

    fireEvent.mouseDown(document.body);
    fireEvent.click(document.body);

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("should stay open when a press starts inside the panel", async () => {
    const { panel, trigger } = openPanel();
    await waitForClickAway();

    fireEvent.mouseDown(panel.querySelector('[role="button"]') as Element);
    fireEvent.click(document.body);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });
});

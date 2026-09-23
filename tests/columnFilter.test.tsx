import {
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fireEvent, render, screen } from "@testing-library/react";
import { JSX } from "react";
import { ColumnFilter } from "../src/components/Table/components/TableFeatures/ColumnFilter/columnFilter";
import { ColumnFilterProps } from "../src/components/Table/components/TableFeatures/ColumnFilter/types";
import { expectControlsResolveToMenu } from "./utils/ariaPopup";

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
 * @param props - Column filter props to pass through.
 * @param props.data - Table rows; empty rows leave the trigger disabled.
 * @param props.MenuListProps - Deprecated MUI list props, as a consumer may pass.
 * @returns Column filter under test.
 */
function TestColumnFilter({
  data = DATA,
  MenuListProps,
}: Pick<ColumnFilterProps<Row>, "MenuListProps"> & {
  data?: Row[];
}): JSX.Element {
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
  return (
    <ColumnFilter
      column={table.getAllColumns()[0]}
      MenuListProps={MenuListProps}
    />
  );
}

describe("ColumnFilter", () => {
  it("should declare that the trigger opens a menu", () => {
    render(<TestColumnFilter />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("should reference the menu list once it is open", () => {
    render(<TestColumnFilter />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });

    fireEvent.click(trigger);

    expectControlsResolveToMenu(trigger);
    // The list keeps its component="div" default alongside the added id.
    expect(screen.getByRole("menu", { hidden: true }).tagName).toBe("DIV");
  });

  // With no faceted values the trigger is disabled and cannot open, so it
  // announces no expanded state or controlled menu.
  it("should omit expanded state and controls while disabled", () => {
    render(<TestColumnFilter data={[]} />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(trigger.hasAttribute("aria-expanded")).toBe(false);
    expect(trigger.hasAttribute("aria-controls")).toBe(false);
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
  });

  // MUI Menu builds `{ list: MenuListProps, ...slotProps }`, so setting the
  // list slot for the id would silently drop a caller's deprecated MenuListProps.
  it("should keep a caller's MenuListProps alongside the id", () => {
    render(<TestColumnFilter MenuListProps={{ className: "from-list" }} />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });

    fireEvent.click(trigger);

    const menu = screen.getByRole("menu", { hidden: true });
    expect(menu.classList.contains("from-list")).toBe(true);
    expect(menu.id).toBe(trigger.getAttribute("aria-controls"));
  });
});

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

const TRIGGER_NAME = /Organism/;

/**
 * Renders a column filter over a column with facetable values, which is the
 * only state in which its trigger is enabled.
 * @param props - Column filter props to pass through.
 * @param props.MenuListProps - Deprecated MUI list props, as a consumer may pass.
 * @returns Column filter under test.
 */
function TestColumnFilter({
  MenuListProps,
}: Pick<ColumnFilterProps<Row>, "MenuListProps">): JSX.Element {
  const columnHelper = createColumnHelper<Row>();
  const table = useReactTable<Row>({
    columns: [
      columnHelper.accessor("organism", {
        filterFn: "arrIncludesSome",
        header: "Organism",
      }),
    ],
    data: [{ organism: "Homo sapiens" }, { organism: "Mus musculus" }],
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

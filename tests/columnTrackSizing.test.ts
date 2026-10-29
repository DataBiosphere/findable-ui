import { Column, RowData } from "@tanstack/react-table";
import {
  getColumnCellPadding,
  getTableCellContentMaxWidth,
} from "../src/components/Table/components/TableCell/common/utils";
import { getColumnTrackSize } from "../src/components/TableCreator/options/columnTrackSizing/utils";
import { GridTrackSize } from "../src/config/entities";

function getColumn(width?: GridTrackSize): Column<RowData> {
  return { columnDef: { meta: { width } } } as Column<RowData>;
}

describe("getColumnTrackSize", () => {
  it.each<[GridTrackSize | undefined, string]>([
    [undefined, "1fr"],
    ["120px", "120px"],
    ["fit-content(280px)", "fit-content(280px)"],
    [{ max: "1fr", min: "200px" }, "minmax(200px, 1fr)"],
  ])("returns the track size for width %j", (width, expected) => {
    expect(getColumnTrackSize(getColumn(width))).toBe(expected);
  });
});

describe("getTableCellContentMaxWidth", () => {
  it.each<GridTrackSize | undefined>([
    undefined,
    "120px",
    "max-content",
    { max: "1fr", min: "200px" },
  ])("returns no maximum for width %j", (width) => {
    expect(getTableCellContentMaxWidth(getColumn(width))).toBeUndefined();
  });

  it.each([
    ["checkbox", "calc(280px - 16px)"],
    ["none", "calc(280px - 0px)"],
  ])("subtracts the %s cell padding", (padding, expected) => {
    const column = {
      columnDef: { meta: { padding, width: "fit-content(280px)" } },
      id: "column",
    } as unknown as Column<RowData>;
    expect(getTableCellContentMaxWidth(column)).toBe(expected);
  });

  it("returns the fit-content limit less the cell padding", () => {
    expect(getTableCellContentMaxWidth(getColumn("fit-content(280px)"))).toBe(
      "calc(280px - 32px)",
    );
  });
});

describe("getColumnCellPadding", () => {
  it("returns the column meta padding when set", () => {
    const column = {
      columnDef: { meta: { padding: "checkbox" } },
      id: "column",
    } as Column<RowData>;
    expect(getColumnCellPadding(column)).toBe("checkbox");
  });

  it("returns the padding for the column ID otherwise", () => {
    const column = { columnDef: {}, id: "column" } as Column<RowData>;
    expect(getColumnCellPadding(column)).toBe("normal");
  });
});

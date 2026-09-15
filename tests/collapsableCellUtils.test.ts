import { Cell, RowData } from "@tanstack/react-table";
import { ARIA_LABEL } from "../src/components/Table/components/TableCell/components/CollapsableCell/constants";
import {
  getRowLabel,
  getToggleLabel,
} from "../src/components/Table/components/TableCell/components/CollapsableCell/utils";

const ROW_LABEL = "Sample 123";

/**
 * Returns a minimal pinned cell stub returning the given value.
 * @param value - Value the cell resolves to.
 * @returns Pinned cell stub.
 */
function mockCell(value: unknown): Cell<RowData, unknown> {
  return { getValue: () => value } as Cell<RowData, unknown>;
}

describe("getRowLabel", () => {
  it("should return a string value", () => {
    expect(getRowLabel(mockCell(ROW_LABEL))).toBe(ROW_LABEL);
  });

  it("should trim surrounding whitespace from a string value", () => {
    expect(getRowLabel(mockCell("  Sample 123  "))).toBe(ROW_LABEL);
  });

  it("should stringify a number value", () => {
    expect(getRowLabel(mockCell(0))).toBe("0");
  });

  it.each([
    ["undefined", undefined],
    ["null", null],
    ["whitespace-only", "   "],
    ["an object", { name: ROW_LABEL }],
    ["an array", [ROW_LABEL]],
  ])("should discard %s rather than stringify it", (_, value) => {
    expect(getRowLabel(mockCell(value))).toBeUndefined();
  });
});

describe("getToggleLabel", () => {
  // Every row renders one of these, so a bare "Row details" repeated per row is
  // indistinguishable in a screen reader's element list.
  it("should identify the row when a label is given", () => {
    expect(getToggleLabel(ROW_LABEL)).toBe("Row details: Sample 123");
  });

  it("should fall back to the bare name when no row label is given", () => {
    expect(getToggleLabel(undefined)).toBe(ARIA_LABEL.ROW_DETAILS);
  });
});

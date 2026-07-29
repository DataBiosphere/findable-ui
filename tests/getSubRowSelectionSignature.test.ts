import { Row, RowData } from "@tanstack/react-table";
import { getSubRowSelectionSignature } from "../src/components/Table/components/TableRows/components/CollapsableRows/utils";

interface SubRowState {
  isSelected: boolean;
  isSomeSelected?: boolean;
}

/**
 * Builds a minimal Row stub exposing only the members
 * getSubRowSelectionSignature reads.
 * @param isGrouped - Whether the row is a grouping row.
 * @param subRows - Selection state for each sub-row.
 * @returns Row stub.
 */
function mockRow(
  isGrouped: boolean,
  subRows: SubRowState[] = [],
): Row<RowData> {
  return {
    getIsGrouped: () => isGrouped,
    subRows: subRows.map((state) => ({
      getIsSelected: () => state.isSelected,
      getIsSomeSelected: () => state.isSomeSelected ?? false,
    })),
  } as unknown as Row<RowData>;
}

describe("getSubRowSelectionSignature", () => {
  it("returns an empty string for non-grouped rows (even with sub-rows)", () => {
    expect(
      getSubRowSelectionSignature(mockRow(false, [{ isSelected: true }])),
    ).toBe("");
  });

  it("distinguishes 0, 1 and 2 selected sub-rows (the reported regression)", () => {
    const none = mockRow(true, [
      { isSelected: false },
      { isSelected: false },
      { isSelected: false },
    ]);
    const one = mockRow(true, [
      { isSelected: true },
      { isSelected: false },
      { isSelected: false },
    ]);
    const two = mockRow(true, [
      { isSelected: true },
      { isSelected: true },
      { isSelected: false },
    ]);
    expect(getSubRowSelectionSignature(none)).toBe("000");
    expect(getSubRowSelectionSignature(one)).toBe("200");
    expect(getSubRowSelectionSignature(two)).toBe("220");
    // The bug: selecting a second sub-row must change the signature.
    expect(getSubRowSelectionSignature(one)).not.toBe(
      getSubRowSelectionSignature(two),
    );
  });

  it("encodes a partially-selected nested subgroup as tri-state '1'", () => {
    const partial = mockRow(true, [
      { isSelected: false, isSomeSelected: true },
      { isSelected: false },
    ]);
    expect(getSubRowSelectionSignature(partial)).toBe("10");
    // Distinct from both none-selected and fully-selected.
    expect(getSubRowSelectionSignature(partial)).not.toBe(
      getSubRowSelectionSignature(
        mockRow(true, [{ isSelected: false }, { isSelected: false }]),
      ),
    );
    expect(getSubRowSelectionSignature(partial)).not.toBe(
      getSubRowSelectionSignature(
        mockRow(true, [{ isSelected: true }, { isSelected: false }]),
      ),
    );
  });
});

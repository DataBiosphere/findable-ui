import { jest } from "@jest/globals";
import {
  type ColumnDef,
  getCoreRowModel,
  type GroupingState,
  type Table,
  useReactTable,
} from "@tanstack/react-table";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import type { JSX } from "react";
import { COLUMN_IDENTIFIER } from "../src/components/Table/common/columnIdentifier";
import { handleResetVisibilityState } from "../src/components/Table/components/TableFeatures/ColumnVisibility/utils";
import { ColumnVisibilityPresets } from "../src/components/Table/components/TableToolbar/components/ColumnVisibilityPresets/columnVisibilityPresets";
import { getUngroupTooltip } from "../src/components/Table/components/TableToolbar/components/ColumnVisibilityPresets/hooks/UseColumnVisibilityPresets/utils";
import { COLUMN_VISIBILITY_PRESETS } from "../src/components/Table/components/TableToolbar/components/ColumnVisibilityPresets/stories/constants";
import { useStoryTable } from "../src/components/Table/components/TableToolbar/components/ColumnVisibilityPresets/stories/hook";
import type { Row } from "../src/components/Table/components/TableToolbar/components/ColumnVisibilityPresets/stories/types";
import type { ColumnVisibilityPreset } from "../src/components/Table/features/ColumnVisibilityPresets/types";
import {
  applyColumnVisibilityPreset,
  assertColumnVisibilityPresets,
  getActiveColumnVisibilityPreset,
  getCanApplyColumnVisibilityPreset,
} from "../src/components/Table/features/ColumnVisibilityPresets/utils";
import { getInitialColumnVisibilityState } from "../src/components/TableCreator/options/initialState/columnVisibility";

// Story presets: "default" hides contigN50 and coverage, "quality" hides organism and source, "all" hides nothing.
// The accession column can't be hidden.

/**
 * Returns the IDs of the table's visible columns.
 * @param table - Table.
 * @returns Visible column IDs.
 */
function getVisibleColumnIds(table: Table<Row>): string[] {
  return table.getVisibleLeafColumns().map(({ id }) => id);
}

/**
 * Renders the story table, with the first preset applied unless an initial column visibility is given.
 * @param initialColumnVisibility - Initial column visibility.
 * @param grouping - Initial grouping.
 * @returns The rendered table, read through `result.current`.
 */
function renderTable(
  initialColumnVisibility?: Record<string, boolean>,
  grouping?: GroupingState,
): ReturnType<typeof renderHook<Table<Row>, unknown>> {
  return renderHook(() => useStoryTable(initialColumnVisibility, grouping));
}

describe("column visibility presets", () => {
  it("starts with the first preset's columns, and that preset on", () => {
    const { result } = renderTable();

    expect(getVisibleColumnIds(result.current)).toEqual([
      "accession",
      "organism",
      "level",
      "source",
    ]);
    expect(result.current.getActiveColumnVisibilityPreset()?.key).toBe(
      "default",
    );
  });

  it("applies each preset's columns, showing columns the preset doesn't list", () => {
    const { result } = renderTable();

    act(() => result.current.applyColumnVisibilityPreset("quality"));
    expect(getVisibleColumnIds(result.current)).toEqual([
      "accession",
      "level",
      "coverage",
      "contigN50",
    ]);

    act(() => result.current.applyColumnVisibilityPreset("all"));
    expect(getVisibleColumnIds(result.current)).toEqual([
      "accession",
      "organism",
      "level",
      "coverage",
      "contigN50",
      "source",
    ]);
  });

  it("is on only while the visible columns match, and on again after applying it again", () => {
    const { result } = renderTable();

    expect(result.current.getIsColumnVisibilityPresetActive("default")).toBe(
      true,
    );
    expect(result.current.getIsColumnVisibilityPresetActive("quality")).toBe(
      false,
    );

    act(() => result.current.getColumn("level")?.toggleVisibility());
    expect(result.current.getIsColumnVisibilityPresetActive("default")).toBe(
      false,
    );
    expect(result.current.getActiveColumnVisibilityPreset()).toBeUndefined();

    act(() => result.current.applyColumnVisibilityPreset("default"));
    expect(result.current.getIsColumnVisibilityPresetActive("default")).toBe(
      true,
    );
  });

  it("matches a preset that lists no columns when every column is visible", () => {
    const { result } = renderTable({});

    expect(result.current.getActiveColumnVisibilityPreset()?.key).toBe("all");
  });

  it("ignores columns that can't be hidden", () => {
    const { result } = renderTable();

    act(() =>
      result.current.setColumnVisibility((old) => ({
        ...old,
        accession: false,
      })),
    );

    expect(result.current.getIsColumnVisibilityPresetActive("default")).toBe(
      true,
    );
  });

  it("treats an unknown preset as off, and applying it as a no-op", () => {
    const { result } = renderTable();

    act(() => result.current.applyColumnVisibilityPreset("unknown"));

    expect(result.current.getIsColumnVisibilityPresetActive("unknown")).toBe(
      false,
    );
    expect(result.current.getActiveColumnVisibilityPreset()?.key).toBe(
      "default",
    );
  });
});

describe("getInitialColumnVisibilityState", () => {
  it("uses the first preset in place of the initial column visibility", () => {
    expect(
      getInitialColumnVisibilityState({
        columnVisibilityPresets: COLUMN_VISIBILITY_PRESETS,
        enableRowSelection: true,
        initialState: { columnVisibility: { level: false } },
      }),
    ).toEqual({
      [COLUMN_IDENTIFIER.ROW_POSITION]: false,
      [COLUMN_IDENTIFIER.ROW_SELECTION]: true,
      contigN50: false,
      coverage: false,
    });
  });

  it("uses the initial column visibility without presets", () => {
    expect(
      getInitialColumnVisibilityState({
        initialState: { columnVisibility: { level: false } },
      }),
    ).toEqual({
      [COLUMN_IDENTIFIER.ROW_POSITION]: false,
      [COLUMN_IDENTIFIER.ROW_SELECTION]: false,
      level: false,
    });
  });
});

describe("assertColumnVisibilityPresets", () => {
  it("accepts distinct presets, or none", () => {
    expect(() =>
      assertColumnVisibilityPresets(COLUMN_VISIBILITY_PRESETS, "assemblies"),
    ).not.toThrow();
    expect(() =>
      assertColumnVisibilityPresets(undefined, "assemblies"),
    ).not.toThrow();
  });

  it("rejects a first preset that hides an initially grouped column", () => {
    expect(() =>
      assertColumnVisibilityPresets(COLUMN_VISIBILITY_PRESETS, "assemblies", [
        "contigN50",
      ]),
    ).toThrow(
      'Column visibility preset "default" for assemblies hides "contigN50", which the table is initially grouped by.',
    );
  });

  it("accepts a later preset that hides an initially grouped column, which is only unavailable while grouped", () => {
    // "quality" hides organism; "default", the first preset, shows it.
    expect(() =>
      assertColumnVisibilityPresets(COLUMN_VISIBILITY_PRESETS, "assemblies", [
        "organism",
      ]),
    ).not.toThrow();
  });

  it("rejects presets that share a key", () => {
    expect(() =>
      assertColumnVisibilityPresets(
        [
          { columnVisibility: { level: false }, key: "a", label: "A" },
          { columnVisibility: { source: false }, key: "a", label: "B" },
        ],
        "assemblies",
      ),
    ).toThrow('Column visibility presets for assemblies share the key "a".');
  });

  it("rejects presets that show the same columns, counting unlisted columns as visible", () => {
    expect(() =>
      assertColumnVisibilityPresets(
        [
          { columnVisibility: { level: false }, key: "a", label: "A" },
          {
            columnVisibility: { level: false, source: true },
            key: "b",
            label: "B",
          },
        ],
        "assemblies",
      ),
    ).toThrow(
      'Column visibility presets "a" and "b" for assemblies show the same columns.',
    );
  });
});

describe("ColumnVisibilityPresets", () => {
  let table: Table<Row>;

  /**
   * Renders the preset toggle for the story table, keeping the table for the test.
   * @returns The preset toggle.
   */
  function TestToggle(): JSX.Element {
    table = useStoryTable();
    return <ColumnVisibilityPresets tableInstance={table} />;
  }

  it("selects the preset that matches the visible columns, and applies a chosen preset", () => {
    render(<TestToggle />);
    const defaultButton = screen.getByRole("button", { name: "Default" });
    const qualityButton = screen.getByRole("button", { name: "Quality" });

    expect(defaultButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(qualityButton);
    expect(qualityButton).toHaveAttribute("aria-pressed", "true");
    expect(defaultButton).toHaveAttribute("aria-pressed", "false");

    act(() => table.getColumn("level")?.toggleVisibility());
    expect(qualityButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(qualityButton);
    expect(qualityButton).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps the selected preset when it is clicked again", () => {
    render(<TestToggle />);
    const defaultButton = screen.getByRole("button", { name: "Default" });

    fireEvent.click(defaultButton);

    expect(defaultButton).toHaveAttribute("aria-pressed", "true");
  });
});

describe("column visibility presets with grouping", () => {
  it("can't apply a preset that would hide a grouped column, and leaves the columns as they are", () => {
    const { result } = renderTable(undefined, ["organism"]);

    expect(result.current.getCanApplyColumnVisibilityPreset("quality")).toBe(
      false,
    );
    expect(result.current.getCanApplyColumnVisibilityPreset("default")).toBe(
      true,
    );

    act(() => result.current.applyColumnVisibilityPreset("quality"));

    expect(result.current.getActiveColumnVisibilityPreset()?.key).toBe(
      "default",
    );
  });

  it("can apply it again once ungrouped", () => {
    const { result } = renderTable(undefined, ["organism"]);

    act(() => result.current.setGrouping([]));
    act(() => result.current.applyColumnVisibilityPreset("quality"));

    expect(result.current.getActiveColumnVisibilityPreset()?.key).toBe(
      "quality",
    );
  });

  it("names the grouped columns to ungroup", () => {
    const { result } = renderTable(undefined, ["organism", "level"]);
    const organism = result.current.getColumn("organism");
    const level = result.current.getColumn("level");
    const source = result.current.getColumn("source");

    expect(getUngroupTooltip([])).toBe("");
    expect(organism && getUngroupTooltip([organism])).toBe(
      "Ungroup Organism to use this preset",
    );
    expect(
      organism &&
        level &&
        source &&
        getUngroupTooltip([organism, level, source]),
    ).toBe("Ungroup Organism, Level and Source to use this preset");
  });
});

describe("column visibility presets on columns the column picker can't toggle", () => {
  const PRESETS: ColumnVisibilityPreset[] = [
    {
      columnVisibility: { custom: false, name: false },
      key: "lean",
      label: "Lean",
    },
    { columnVisibility: {}, key: "all", label: "All" },
  ];
  const COLUMNS: ColumnDef<{ custom: string; name: string }>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "custom", header: () => "Custom" }, // Not a string header, so not in the column picker.
  ];

  it("leaves out columns without a string header, as the column picker does", () => {
    const { result } = renderHook(() =>
      useReactTable({
        columnVisibilityPresets: PRESETS,
        columns: COLUMNS,
        data: [],
        enableHiding: true,
        getCoreRowModel: getCoreRowModel(),
      }),
    );

    act(() => applyColumnVisibilityPreset(result.current, "lean"));

    expect(result.current.getColumn("custom")?.getIsVisible()).toBe(true);
    expect(result.current.getColumn("name")?.getIsVisible()).toBe(false);
    expect(getActiveColumnVisibilityPreset(result.current)?.key).toBe("lean");
  });
});

describe("ColumnVisibilityPresets on a table without the feature registered", () => {
  /**
   * Renders the preset toggle for a table built without the COLUMN_VISIBILITY_PRESETS feature.
   * @param props - Props.
   * @param props.presets - Presets, if any.
   * @returns The preset toggle.
   */
  function TestToggle({
    presets,
  }: {
    presets?: ColumnVisibilityPreset[];
  }): JSX.Element {
    const table = useReactTable({
      columnVisibilityPresets: presets,
      columns: [
        { accessorKey: "organism", header: "Organism" },
        { accessorKey: "source", header: "Source" },
      ],
      data: [],
      enableHiding: true,
      getCoreRowModel: getCoreRowModel(),
    });
    return <ColumnVisibilityPresets tableInstance={table} />;
  }

  it("renders nothing without presets, without crashing", () => {
    const { container } = render(<TestToggle />);

    expect(container).toBeEmptyDOMElement();
  });

  it("works with presets", () => {
    render(
      <TestToggle
        presets={[
          { columnVisibility: {}, key: "all", label: "All" },
          { columnVisibility: { source: false }, key: "lean", label: "Lean" },
        ]}
      />,
    );
    const lean = screen.getByRole("button", { name: "Lean" });

    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(lean);
    expect(lean).toHaveAttribute("aria-pressed", "true");
  });
});

describe("ColumnVisibilityPresets with an empty-string preset key", () => {
  it("applies the preset whose key is an empty string", () => {
    /**
     * Renders the preset toggle for a table with a preset keyed "".
     * @returns The preset toggle.
     */
    function TestToggle(): JSX.Element {
      const table = useReactTable({
        columnVisibilityPresets: [
          { columnVisibility: { source: false }, key: "lean", label: "Lean" },
          { columnVisibility: {}, key: "", label: "All" },
        ],
        columns: [
          { accessorKey: "organism", header: "Organism" },
          { accessorKey: "source", header: "Source" },
        ],
        data: [],
        enableHiding: true,
        getCoreRowModel: getCoreRowModel(),
        initialState: { columnVisibility: { source: false } },
      });
      return <ColumnVisibilityPresets tableInstance={table} />;
    }
    render(<TestToggle />);
    const all = screen.getByRole("button", { name: "All" });

    fireEvent.click(all);

    expect(all).toHaveAttribute("aria-pressed", "true");
  });
});

describe("ColumnVisibilityPresets while grouped", () => {
  let table: Table<Row>;

  /**
   * Renders the preset toggle for the story table grouped by organism, keeping the table for the test.
   * @returns The preset toggle.
   */
  function TestToggle(): JSX.Element {
    table = useStoryTable(undefined, ["organism"]);
    return <ColumnVisibilityPresets tableInstance={table} />;
  }

  it("marks a preset that would hide a grouped column unavailable, explains why, and ignores clicks on it", async () => {
    render(<TestToggle />);
    const quality = screen.getByRole("button", { name: "Quality" });

    expect(quality).toHaveAttribute("aria-disabled", "true");
    expect(quality).toHaveAccessibleDescription(
      "Ungroup Organism to use this preset",
    );
    expect(screen.getByRole("button", { name: "Default" })).not.toHaveAttribute(
      "aria-disabled",
    );
    expect(screen.getByRole("button", { name: "Default" })).not.toHaveAttribute(
      "aria-label",
    );

    fireEvent.click(quality);
    expect(quality).toHaveAttribute("aria-pressed", "false");
    expect(getCanApplyColumnVisibilityPreset(table, "quality")).toBe(false);

    fireEvent.mouseOver(quality);
    expect(
      await screen.findByText("Ungroup Organism to use this preset"),
    ).toBeInTheDocument();
  });
});

describe("handleResetVisibilityState", () => {
  it("calls the table's reset option in place of resetting to the initial visibility", () => {
    const onColumnVisibilityReset = jest.fn();
    const { result } = renderHook(() =>
      useReactTable({
        columns: [{ accessorKey: "organism", header: "Organism" }],
        data: [],
        enableHiding: true,
        getCoreRowModel: getCoreRowModel(),
        initialState: { columnVisibility: { organism: false } },
        onColumnVisibilityReset,
      }),
    );

    act(() => result.current.setColumnVisibility({ organism: true }));
    act(() => handleResetVisibilityState(result.current));

    // TanStack's own reset would hide organism again; the option was called instead.
    expect(onColumnVisibilityReset).toHaveBeenCalledTimes(1);
    expect(result.current.getColumn("organism")?.getIsVisible()).toBe(true);
  });
});

describe("table options merged across entities", () => {
  const PRESETS: ColumnVisibilityPreset[] = [
    { columnVisibility: {}, key: "all", label: "All" },
  ];
  const BASE = {
    columns: [{ accessorKey: "organism", header: "Organism" }],
    data: [],
    getCoreRowModel: getCoreRowModel(),
  };

  // The index table is one TanStack table reused across entities, and TanStack merges each render's options into the
  // previous ones; useTableOptions passes columnVisibilityPresets explicitly so an entity without presets clears them.
  it("keeps the previous presets when the next options leave the key out, and clears them when it is undefined", () => {
    const { rerender, result } = renderHook(
      (options: { columnVisibilityPresets?: ColumnVisibilityPreset[] }) =>
        useReactTable({ ...BASE, ...options }),
      {
        initialProps: {
          columnVisibilityPresets: PRESETS,
        } as { columnVisibilityPresets?: ColumnVisibilityPreset[] },
      },
    );

    rerender({});
    expect(result.current.options.columnVisibilityPresets).toBe(PRESETS);

    rerender({ columnVisibilityPresets: undefined });
    expect(result.current.options.columnVisibilityPresets).toBeUndefined();
  });
});

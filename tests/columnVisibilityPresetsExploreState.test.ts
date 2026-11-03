import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import type { ColumnVisibilityPreset } from "../src/components/Table/features/ColumnVisibilityPresets/types";
import type { SiteConfig } from "../src/config/entities";
import type { ExploreState } from "../src/providers/exploreState";

const PRESETS: ColumnVisibilityPreset[] = [
  { columnVisibility: { sex: false }, key: "default", label: "Default" },
  { columnVisibility: { uri: false }, key: "detail", label: "Detail" },
];

// Files has presets; datasets has none, and hides "modality" initially.
const CONFIG = {
  entities: [
    {
      list: { tableOptions: { columnVisibilityPresets: PRESETS } },
      route: "files",
    },
    {
      list: {
        tableOptions: {
          initialState: { columnVisibility: { modality: false } },
        },
      },
      route: "datasets",
    },
  ],
} as unknown as SiteConfig;

let entityConfig: SiteConfig["entities"][number];

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({ config: CONFIG, entityConfig })),
}));
for (const option of ["expanded", "grouping", "sorting", "visibility"]) {
  jest.unstable_mockModule(
    `../src/components/TableCreator/options/${option}/hook`,
    () => ({
      useExpandedOptions: jest.fn(() => ({})),
      useGroupingOptions: jest.fn(() => ({})),
      useSortingOptions: jest.fn(() => ({})),
      useVisibilityOptions: jest.fn(() => ({})),
    }),
  );
}

const { useTableOptions } =
  await import("../src/components/TableCreator/options/hook");
const { resetColumnVisibilityAction } =
  await import("../src/providers/exploreState/actions/resetVisibility/action");
const { COLUMN_IDENTIFIER } =
  await import("../src/components/Table/common/columnIdentifier");

const SYSTEM_COLUMNS = {
  [COLUMN_IDENTIFIER.ROW_POSITION]: false,
  [COLUMN_IDENTIFIER.ROW_SELECTION]: false,
};

/**
 * Creates explore state on the given tab, with changed column visibility on both entities.
 * @param tabValue - Current entity list type.
 * @param grouping - Current entity's grouping.
 * @returns Explore state.
 */
function makeState(tabValue: string, grouping: string[] = []): ExploreState {
  return {
    entityPageState: {
      datasets: {
        columnVisibility: { diagnosis: false, modality: true },
        grouping: tabValue === "datasets" ? grouping : [],
      },
      files: {
        columnVisibility: { sex: true, uri: true },
        grouping: tabValue === "files" ? grouping : [],
      },
    },
    tabValue,
  } as unknown as ExploreState;
}

describe("resetColumnVisibilityAction", () => {
  it("resets the current entity to its own initial columns, leaving other entities alone", () => {
    const state = resetColumnVisibilityAction(makeState("datasets"), CONFIG);

    expect(state.entityPageState.datasets.columnVisibility).toEqual({
      ...SYSTEM_COLUMNS,
      modality: false,
    });
    expect(state.entityPageState.files.columnVisibility).toEqual({
      sex: true,
      uri: true,
    });
  });

  it("resets an entity with presets to its first preset", () => {
    const state = resetColumnVisibilityAction(makeState("files"), CONFIG);

    expect(state.entityPageState.files.columnVisibility).toEqual({
      ...SYSTEM_COLUMNS,
      sex: false,
    });
  });

  it("keeps grouped columns visible", () => {
    const state = resetColumnVisibilityAction(
      makeState("datasets", ["modality"]),
      CONFIG,
    );

    expect(state.entityPageState.datasets.columnVisibility).toEqual({
      ...SYSTEM_COLUMNS,
      modality: true,
    });
  });
});

describe("useTableOptions", () => {
  it("passes the entity's presets", () => {
    entityConfig = CONFIG.entities[0];

    const { result } = renderHook(() => useTableOptions());

    expect(result.current.columnVisibilityPresets).toBe(PRESETS);
  });

  // The index table is reused across entities and TanStack merges options, so a missing key would keep the previous
  // entity's presets.
  it("passes an explicit undefined for an entity without presets", () => {
    entityConfig = CONFIG.entities[1];

    const { result } = renderHook(() => useTableOptions());

    expect(result.current).toHaveProperty("columnVisibilityPresets", undefined);
  });
});

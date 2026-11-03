import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { JSX, ReactNode } from "react";
import type { ColumnVisibilityPreset } from "../src/components/Table/features/ColumnVisibilityPresets/types";
import type { SiteConfig } from "../src/config/entities";
import type { ExploreState } from "../src/providers/exploreState";

const PRESETS: ColumnVisibilityPreset[] = [
  { columnVisibility: { sex: false }, key: "default", label: "Default" },
  { columnVisibility: { uri: false }, key: "detail", label: "Detail" },
];

/**
 * Creates a site config whose files entity has the given presets.
 * @param presets - Column visibility presets for the files entity.
 * @returns Site config.
 */
function makeConfig(presets: ColumnVisibilityPreset[]): SiteConfig {
  return {
    entities: [
      {
        list: { tableOptions: { columnVisibilityPresets: presets } },
        route: "files",
      },
    ],
  } as unknown as SiteConfig;
}

let config: SiteConfig;

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({ config, defaultEntityListType: "files" })),
}));
jest.unstable_mockModule("../src/hooks/useURLFilterParams", () => ({
  useURLFilterParams: jest.fn(() => ({ decodedFilterParam: "[]" })),
}));

const { ExploreStateProvider } = await import("../src/providers/exploreState");
const { useExploreState } = await import("../src/hooks/useExploreState");
const { useVisibilityOptions } =
  await import("../src/components/TableCreator/options/visibility/hook");
const { COLUMN_IDENTIFIER } =
  await import("../src/components/Table/common/columnIdentifier");

/**
 * Wraps children in the explore state provider on the files entity.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns Explore state provider.
 */
function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ExploreStateProvider entityListType="files">
      {children}
    </ExploreStateProvider>
  );
}

/**
 * Explore state and visibility options, read inside the explore state provider.
 */
interface ExploreStateResult {
  exploreState: ExploreState;
  visibilityOptions: ReturnType<typeof useVisibilityOptions>;
}

/**
 * Renders the explore state and visibility options inside the explore state provider.
 * @returns The rendered hook, read through `result.current`.
 */
function renderExploreState(): ReturnType<
  typeof renderHook<ExploreStateResult, unknown>
> {
  return renderHook(
    () => ({
      exploreState: useExploreState().exploreState,
      visibilityOptions: useVisibilityOptions(),
    }),
    { wrapper: Wrapper },
  );
}

describe("ExploreStateProvider column visibility", () => {
  it("throws on initialization when an entity's presets share a key", () => {
    config = makeConfig([PRESETS[0], { ...PRESETS[1], key: PRESETS[0].key }]);
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() => renderExploreState()).toThrow(
      'Column visibility presets for files share the key "default".',
    );

    consoleError.mockRestore();
  });

  it("resets the current entity's columns to its first preset", () => {
    config = makeConfig(PRESETS);
    const { result } = renderExploreState();

    act(() =>
      result.current.visibilityOptions.onColumnVisibilityChange?.({
        sex: true,
        uri: false,
      }),
    );
    expect(
      result.current.exploreState.entityPageState.files.columnVisibility,
    ).toEqual({ sex: true, uri: false });

    act(() => result.current.visibilityOptions.onColumnVisibilityReset?.());

    expect(
      result.current.exploreState.entityPageState.files.columnVisibility,
    ).toEqual({
      [COLUMN_IDENTIFIER.ROW_POSITION]: false,
      [COLUMN_IDENTIFIER.ROW_SELECTION]: false,
      sex: false,
    });
  });
});

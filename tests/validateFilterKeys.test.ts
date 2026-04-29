import type { RowData, Table } from "@tanstack/react-table";
import { isColumnFilter } from "../src/common/filters/adapters/tanstack/typeGuards";
import { validateFilterParam } from "../src/common/filters/hooks/UseValidateFilterKeys/utils";
import { getValidColumnIds } from "../src/components/DataDictionary/utils";
import type {
  CategoryGroupConfig,
  EntityConfig,
  SiteConfig,
} from "../src/config/entities";
import { DataExplorerError } from "../src/types/error";
import { getValidCategoryKeys } from "../src/views/ExploreView/hooks/UseValidateFilterParam/utils";

// Simple validator/extractor for testing validateFilterParam.
const isEntry = (v: unknown): boolean =>
  typeof v === "object" && v !== null && "key" in v;
const extractKey = (v: unknown): string => (v as { key: string }).key;

describe("validateFilterParam", () => {
  it("returns undefined for undefined param", () => {
    expect(
      validateFilterParam(undefined, new Set(["a"]), isEntry, extractKey),
    ).toBeUndefined();
  });

  it("returns error for non-string param (string array)", () => {
    const result = validateFilterParam(
      ["a", "b"],
      undefined,
      isEntry,
      extractKey,
    );
    expect(result).toBeInstanceOf(DataExplorerError);
    expect(result?.message).toBe("Invalid filter parameter in URL");
  });

  it("returns error for malformed URI encoding", () => {
    const result = validateFilterParam(
      "%E0%A4%A",
      undefined,
      isEntry,
      extractKey,
    );
    expect(result).toBeInstanceOf(DataExplorerError);
    expect(result?.message).toBe("Invalid filter parameter in URL");
  });

  it("returns error for invalid JSON", () => {
    const result = validateFilterParam(
      '{"truncated',
      undefined,
      isEntry,
      extractKey,
    );
    expect(result).toBeInstanceOf(DataExplorerError);
    expect(result?.message).toBe("Invalid filter parameter in URL");
  });

  it("returns error for non-array JSON", () => {
    const result = validateFilterParam(
      '{"key":"a"}',
      undefined,
      isEntry,
      extractKey,
    );
    expect(result).toBeInstanceOf(DataExplorerError);
    expect(result?.message).toBe("Invalid filter parameter in URL");
  });

  it("returns undefined for empty array", () => {
    expect(
      validateFilterParam("[]", new Set(["a"]), isEntry, extractKey),
    ).toBeUndefined();
  });

  it("returns error when entries fail shape validation", () => {
    const param = JSON.stringify(["not an object"]);
    const result = validateFilterParam(param, undefined, isEntry, extractKey);
    expect(result).toBeInstanceOf(DataExplorerError);
    expect(result?.message).toBe("Invalid filter entry shape in URL");
  });

  it("returns undefined when entries pass shape validation and no valid keys", () => {
    const param = JSON.stringify([{ key: "a" }]);
    expect(
      validateFilterParam(param, undefined, isEntry, extractKey),
    ).toBeUndefined();
  });

  it("returns undefined when all keys are valid", () => {
    const param = JSON.stringify([{ key: "a" }, { key: "b" }]);
    expect(
      validateFilterParam(param, new Set(["a", "b", "c"]), isEntry, extractKey),
    ).toBeUndefined();
  });

  it("returns error with offending key when a key is not in the valid set", () => {
    const param = JSON.stringify([{ key: "a" }, { key: "bogus" }]);
    const result = validateFilterParam(
      param,
      new Set(["a", "b"]),
      isEntry,
      extractKey,
    );
    expect(result).toBeInstanceOf(DataExplorerError);
    expect(result?.message).toBe("Unknown filter key in URL: bogus");
  });

  it("skips key validation when validKeys is undefined", () => {
    const param = JSON.stringify([{ key: "anything" }]);
    expect(
      validateFilterParam(param, undefined, isEntry, extractKey),
    ).toBeUndefined();
  });

  it("handles URI-encoded param", () => {
    const raw = JSON.stringify([{ key: "a" }]);
    const encoded = encodeURIComponent(raw);
    expect(
      validateFilterParam(encoded, new Set(["a"]), isEntry, extractKey),
    ).toBeUndefined();
  });
});

describe("isColumnFilter", () => {
  it("returns true for a valid ColumnFilter", () => {
    expect(isColumnFilter({ id: "name", value: "test" })).toBe(true);
  });

  it("returns true for a ColumnFilter with array value", () => {
    expect(isColumnFilter({ id: "status", value: ["active", "pending"] })).toBe(
      true,
    );
  });

  it("returns true for a ColumnFilter with null value", () => {
    expect(isColumnFilter({ id: "name", value: null })).toBe(true);
  });

  it("returns false when id is missing", () => {
    expect(isColumnFilter({ value: "test" })).toBe(false);
  });

  it("returns false when value is missing", () => {
    expect(isColumnFilter({ id: "name" })).toBe(false);
  });

  it("returns false when id is not a string", () => {
    expect(isColumnFilter({ id: 123, value: "test" })).toBe(false);
  });

  it("returns false for null", () => {
    expect(isColumnFilter(null)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isColumnFilter("not a filter")).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isColumnFilter(undefined)).toBe(false);
  });
});

describe("getValidCategoryKeys", () => {
  const buildConfig = (
    entityCategoryGroupConfig?: CategoryGroupConfig,
    siteCategoryGroupConfig?: CategoryGroupConfig,
  ): { config: SiteConfig; entityConfig: EntityConfig } => {
    const entityConfig = {
      categoryGroupConfig: entityCategoryGroupConfig,
    } as EntityConfig;
    const config = {
      categoryGroupConfig: siteCategoryGroupConfig,
    } as SiteConfig;
    return { config, entityConfig };
  };

  it("returns keys from entity category group config", () => {
    const { config, entityConfig } = buildConfig({
      categoryGroups: [
        {
          categoryConfigs: [
            { key: "species", label: "Species" },
            { key: "organ", label: "Organ" },
          ],
        },
        {
          categoryConfigs: [{ key: "library", label: "Library" }],
        },
      ],
      key: "test",
    });
    const result = getValidCategoryKeys(config, entityConfig);
    expect(result).toEqual(new Set(["species", "organ", "library"]));
  });

  it("falls back to site category group config when entity has none", () => {
    const { config, entityConfig } = buildConfig(undefined, {
      categoryGroups: [
        {
          categoryConfigs: [{ key: "project", label: "Project" }],
        },
      ],
      key: "site",
    });
    const result = getValidCategoryKeys(config, entityConfig);
    expect(result).toEqual(new Set(["project"]));
  });

  it("returns undefined when no category group config exists", () => {
    const { config, entityConfig } = buildConfig(undefined, undefined);
    const result = getValidCategoryKeys(config, entityConfig);
    expect(result).toBeUndefined();
  });

  it("returns empty set when category groups have no configs", () => {
    const { config, entityConfig } = buildConfig({
      categoryGroups: [{ categoryConfigs: [] }],
      key: "empty",
    });
    const result = getValidCategoryKeys(config, entityConfig);
    expect(result).toEqual(new Set());
  });
});

describe("getValidColumnIds", () => {
  const buildTable = (columnIds: string[]): Table<RowData> => {
    return {
      getAllColumns: () => columnIds.map((id) => ({ id })),
    } as unknown as Table<RowData>;
  };

  it("returns column IDs from table instance", () => {
    const table = buildTable(["name", "type", "description"]);
    expect(getValidColumnIds(table)).toEqual(
      new Set(["name", "type", "description"]),
    );
  });

  it("returns empty set when table has no columns", () => {
    const table = buildTable([]);
    expect(getValidColumnIds(table)).toEqual(new Set());
  });
});

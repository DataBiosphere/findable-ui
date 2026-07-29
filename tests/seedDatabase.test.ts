import { jest } from "@jest/globals";
import fsp from "fs/promises";
import type { EntityConfig } from "../src/config/entities";
import { database } from "../src/utils/database";
import { seedDatabase } from "../src/utils/seedDatabase";

const seed = jest.fn();

/**
 * Builds a minimal entity config for a test with the given static-load file and
 * optional entity mapper.
 * @param staticLoadFile - Static-load file path.
 * @param entityMapper - Optional entity mapper.
 * @returns Entity config.
 */
const config = (
  staticLoadFile: string,
  entityMapper?: (input: unknown) => unknown,
): EntityConfig =>
  ({ entityMapper, staticLoadFile }) as unknown as EntityConfig;

// seedDatabase's cache is module-level and keyed by entity type, persisting for
// the file's lifetime, so each test uses a unique entityListType to stay
// isolated.
describe("seedDatabase", () => {
  let readFile: jest.Mock;

  beforeEach(() => {
    seed.mockReset();
    jest
      .spyOn(database, "get")
      .mockReturnValue({ seed } as unknown as ReturnType<typeof database.get>);
    readFile = jest.spyOn(fsp, "readFile") as unknown as jest.Mock;
    readFile.mockResolvedValue('{"a":{"id":1}}');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("reads and maps once but seeds on every call for the same entity type", async () => {
    for (let i = 0; i < 5; i++) {
      await seedDatabase("repeat", config("repeat.json"));
    }
    // The expensive read/parse/map is memoized...
    expect(readFile).toHaveBeenCalledTimes(1);
    // ...but the seed write runs on every call so the shape is always correct.
    expect(seed).toHaveBeenCalledTimes(5);
  });

  it("applies the config's entityMapper, mapping once per entity across calls", async () => {
    readFile.mockResolvedValue('{"a":{"id":1},"b":{"id":2}}');
    const entityMapper = jest.fn((input: unknown) => ({
      mapped: (input as { id: number }).id,
    }));
    const mapped = config("mapped.json", entityMapper);
    await seedDatabase("mapped", mapped);
    await seedDatabase("mapped", mapped);
    // seed receives the mapped output.
    expect(seed).toHaveBeenLastCalledWith("mapped", [
      { mapped: 1 },
      { mapped: 2 },
    ]);
    // The mapper receives only the entity, not map's (value, index, array).
    expect(entityMapper).toHaveBeenNthCalledWith(1, { id: 1 });
    // Mapping is inside the memoized region: two entities, not two per call.
    expect(entityMapper).toHaveBeenCalledTimes(2);
  });

  it("reads once per entity type", async () => {
    await seedDatabase("typeA", config("typeA.json"));
    await seedDatabase("typeB", config("typeB.json"));
    await seedDatabase("typeA", config("typeA.json"));
    expect(readFile).toHaveBeenCalledTimes(2);
  });

  it("shares a single read across a concurrent burst but seeds each call", async () => {
    await Promise.all(
      Array.from({ length: 10 }, () =>
        seedDatabase("burst", config("burst.json")),
      ),
    );
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(seed).toHaveBeenCalledTimes(10);
  });

  it("throws when staticLoadFile is missing", async () => {
    const noFile = {} as unknown as EntityConfig;
    await expect(seedDatabase("nofile", noFile)).rejects.toThrow(
      /staticLoadFile not found/,
    );
    expect(seed).not.toHaveBeenCalled();
  });

  it("does not cache a failed read; a later call retries with the error wrapped", async () => {
    const cause = new Error("boom");
    readFile.mockRejectedValueOnce(cause);
    // The failure is wrapped with the file path and preserves the cause.
    await expect(
      seedDatabase("retry", config("retry.json")),
    ).rejects.toMatchObject({
      cause,
      message: expect.stringContaining("retry.json"),
    });
    await seedDatabase("retry", config("retry.json"));
    expect(readFile).toHaveBeenCalledTimes(2);
    expect(seed).toHaveBeenCalledTimes(1);
  });

  it("throws a clear error when the catalog JSON is not an object", async () => {
    readFile.mockResolvedValueOnce("null");
    await expect(
      seedDatabase("notobject", config("notobject.json")),
    ).rejects.toThrow(/not a JSON object/);
    expect(seed).not.toHaveBeenCalled();
  });

  it("seeds the elements of a top-level array catalog (e.g. brc-analytics)", async () => {
    readFile.mockResolvedValueOnce('[{ "id": 1 }, { "id": 2 }]');
    await seedDatabase("array", config("array.json"));
    expect(seed).toHaveBeenCalledWith("array", [{ id: 1 }, { id: 2 }]);
  });
});

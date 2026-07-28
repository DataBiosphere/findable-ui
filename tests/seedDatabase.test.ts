import { jest } from "@jest/globals";
import fsp from "fs/promises";
import type { EntityConfig } from "../src/config/entities";
import { database } from "../src/utils/database";
import { seedDatabase } from "../src/utils/seedDatabase";

const seed = jest.fn();

const config = (staticLoadFile: string): EntityConfig =>
  ({ label: staticLoadFile, staticLoadFile }) as unknown as EntityConfig;

// seedDatabase's read cache is module-level and persists for the file's
// lifetime, so each test uses a unique entityListType key to stay isolated.
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

  it("does not cache a failed read; a later call retries", async () => {
    readFile.mockRejectedValueOnce(new Error("boom"));
    await expect(seedDatabase("retry", config("retry.json"))).rejects.toThrow();
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

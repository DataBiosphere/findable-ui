import { SelectedFilter } from "../src/common/entities";
import { ExploreState } from "../src/providers/exploreState";
import { buildNextEntities } from "../src/providers/exploreState/entities/state";
import { EntitiesContext } from "../src/providers/exploreState/entities/types";

/**
 * Creates a minimal ExploreState for testing buildNextEntities.
 * @param root0 - State options.
 * @param root0.catalogState - Catalog state.
 * @param root0.entities - Entities context.
 * @param root0.entityStateByCategoryGroupConfigKey - Entity state by category group config key.
 * @param root0.featureFlagState - Feature flag state.
 * @returns Minimal ExploreState.
 */
function makeState({
  catalogState,
  entities,
  entityStateByCategoryGroupConfigKey,
  featureFlagState,
}: {
  catalogState?: string;
  entities: EntitiesContext;
  entityStateByCategoryGroupConfigKey?: Map<string, unknown>;
  featureFlagState?: string;
}): ExploreState {
  return {
    catalogState,
    entities,
    entityStateByCategoryGroupConfigKey:
      entityStateByCategoryGroupConfigKey ?? new Map(),
    featureFlagState,
  } as unknown as ExploreState;
}

const FILTER_SPECIES: SelectedFilter[] = [
  { categoryKey: "species", value: ["dog"] },
];

const FILTER_STRAIN: SelectedFilter[] = [
  { categoryKey: "strain", value: ["labrador"] },
];

const FILTER_RELEASE: SelectedFilter[] = [
  { categoryKey: "release", value: ["2"] },
];

describe("buildNextEntities", () => {
  it("applies next filter state to the current entity", () => {
    const state = makeState({
      entities: {
        organisms: { entityKey: "organisms-key", query: {} },
      },
    });

    const result = buildNextEntities(state, "organisms", {
      filterState: FILTER_SPECIES,
    });

    expect(result.organisms.query).toEqual({
      entityListType: "organisms",
      filter: JSON.stringify(FILTER_SPECIES),
    });
  });

  it("applies next filter state to entities sharing the same key", () => {
    const state = makeState({
      entities: {
        organisms: { entityKey: "shared-key", query: {} },
        species: { entityKey: "shared-key", query: {} },
      },
    });

    const result = buildNextEntities(state, "organisms", {
      filterState: FILTER_SPECIES,
    });

    expect(result.organisms.query).toEqual({
      entityListType: "organisms",
      filter: JSON.stringify(FILTER_SPECIES),
    });
    expect(result.species.query).toEqual({
      entityListType: "species",
      filter: JSON.stringify(FILTER_SPECIES),
    });
  });

  it("does not touch non-current entity queries", () => {
    const assembliesQuery = {
      entityListType: "assemblies",
      filter: JSON.stringify(FILTER_RELEASE),
    };

    const state = makeState({
      entities: {
        assemblies: { entityKey: "assemblies-key", query: assembliesQuery },
        organisms: { entityKey: "organisms-key", query: {} },
      },
    });

    const result = buildNextEntities(state, "organisms", {
      filterState: FILTER_STRAIN,
    });

    expect(result.organisms.query).toEqual({
      entityListType: "organisms",
      filter: JSON.stringify(FILTER_STRAIN),
    });

    expect(result.assemblies.query).toBe(assembliesQuery);
  });

  it("does not wipe non-current entity filters when clearing current entity", () => {
    const assembliesQuery = {
      entityListType: "assemblies",
      filter: JSON.stringify(FILTER_RELEASE),
    };

    const state = makeState({
      entities: {
        assemblies: { entityKey: "assemblies-key", query: assembliesQuery },
        organisms: { entityKey: "organisms-key", query: {} },
      },
    });

    const result = buildNextEntities(state, "organisms", {
      filterState: [],
    });

    expect(result.organisms.query).toEqual({
      entityListType: "organisms",
    });

    expect(result.assemblies.query).toBe(assembliesQuery);
  });

  it("clones entity context for matching entities only", () => {
    const state = makeState({
      entities: {
        assemblies: { entityKey: "assemblies-key", query: { filter: "x" } },
        organisms: { entityKey: "organisms-key", query: {} },
      },
    });

    const result = buildNextEntities(state, "organisms", {
      filterState: FILTER_SPECIES,
    });

    expect(result.organisms).not.toBe(state.entities.organisms);
    expect(result.assemblies).toBe(state.entities.assemblies);
  });
});

import type { SelectedFilter } from "../src/common/entities";
import type { SiteConfig } from "../src/config/entities";
import { urlToStateAction } from "../src/providers/exploreState/actions/urlToState/action";
import { initReducerArguments } from "../src/providers/exploreState/initializer/utils";

const FILTER_STATE: SelectedFilter[] = [
  { categoryKey: "species", value: ["dog"] },
];

const FILTER_PARAM = JSON.stringify(FILTER_STATE);

// Both entities share one category group, so they share the filter state.
const CONFIG = {
  categoryGroupConfig: { categoryGroups: [], key: "shared" },
  entities: [
    { list: {}, route: "projects" },
    { list: {}, route: "files" },
  ],
} as unknown as SiteConfig;

describe("explore state entity queries", () => {
  it("puts the URL's filters into each entity's query on load", () => {
    const { entities } = initReducerArguments(CONFIG, "projects", FILTER_PARAM);

    expect(entities.projects.query).toEqual({
      entityListType: "projects",
      filter: FILTER_PARAM,
    });
    expect(entities.files.query).toEqual({
      entityListType: "files",
      filter: FILTER_PARAM,
    });
  });

  it("puts the URL's filters into the entity's query after a URL change", () => {
    const state = initReducerArguments(CONFIG, "projects", "[]");

    const { entities } = urlToStateAction(state, {
      query: { entityListType: "projects", filter: FILTER_PARAM },
    });

    expect(entities.projects.query).toEqual({
      entityListType: "projects",
      filter: FILTER_PARAM,
    });
  });
});

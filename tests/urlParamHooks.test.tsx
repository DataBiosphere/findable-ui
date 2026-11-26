import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { NextRouter } from "next/router";
import type { JSX, ReactNode } from "react";
import type { SelectedFilter } from "../src/common/entities";

const FILTER_STATE: SelectedFilter[] = [
  { categoryKey: "species", value: ["dog"] },
];

// Next's real router event emitter, so the hook's beforeHistoryChange listener is the one under test.
const { events } =
  jest.requireActual<typeof import("next/router")>("next/router").default;

// Each replace waits here until a test commits it, like Next's router awaiting its route lookups.
const commits: (() => void)[] = [];

const replace = jest.fn<
  (
    url: { pathname: string; query: NextRouter["query"] },
    as: string,
    options: { shallow: boolean },
  ) => Promise<boolean>
>(
  (_url, as, { shallow }) =>
    new Promise((resolve) => {
      commits.push(() => resolve(commitReplace(as, shallow)));
    }),
);

const ROUTER = {
  asPath: "/",
  basePath: "",
  isReady: true,
  pathname: "/[entityListType]/[...params]",
  query: {} as NextRouter["query"],
};

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  default: { events, replace },
  useRouter: jest.fn(() => ROUTER),
}));

const { CatalogProvider } = await import("../src/providers/catalog/provider");
const { ExploreListProvider } =
  await import("../src/providers/exploreList/provider");
const { useUpdateURLParams } =
  await import("../src/hooks/useUpdateURLParams/hook");

/**
 * Wraps a hook in a CatalogProvider only.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns The wrapped children.
 */
function CatalogWrapper({ children }: { children: ReactNode }): JSX.Element {
  return <CatalogProvider>{children}</CatalogProvider>;
}

/**
 * Wraps a hook in a CatalogProvider and an ExploreListProvider.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns The wrapped children.
 */
function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <CatalogProvider>
      <ExploreListProvider
        allowedLists={["projects", "files"]}
        initialList="projects"
      >
        {children}
      </ExploreListProvider>
    </CatalogProvider>
  );
}

/**
 * Commits every pending replace and waits for each to settle.
 * @returns The replaces' results, in call order.
 */
async function commitAll(): Promise<boolean[]> {
  let results: boolean[] = [];
  await act(async () => {
    for (const commit of commits.splice(0)) commit();
    results = await Promise.all(
      replace.mock.results.map((r) => r.value as Promise<boolean>),
    );
  });
  return results;
}

/**
 * Commits a replace the way Next's router does with its default `trailingSlash: false`: removes the path's trailing
 * slash, emits `beforeHistoryChange`, then writes history unless a listener threw a cancelled error, in which case the
 * replace resolves false.
 * @param as - URL passed to Router.replace as `as`, without the basePath.
 * @param shallow - Whether the replace is shallow.
 * @returns True if history was written.
 */
function commitReplace(as: string, shallow: boolean): boolean {
  const url = new URL(as, window.location.origin);
  const path = url.pathname.replace(/(.)\/$/, "$1");
  const asWithBasePath = `${ROUTER.basePath}${path}${url.search}${url.hash}`;
  try {
    emitBeforeHistoryChange(asWithBasePath, shallow);
  } catch (error) {
    if ((error as { cancelled?: boolean }).cancelled) return false;
    throw error;
  }
  window.history.replaceState(null, "", asWithBasePath);
  return true;
}

/**
 * Emits a `beforeHistoryChange` event, as Next's router does just before it writes history.
 * @param as - The navigation's URL, with the basePath.
 * @param shallow - Whether the navigation is shallow.
 */
function emitBeforeHistoryChange(as: string, shallow: boolean): void {
  events.emit("beforeHistoryChange", as, { shallow });
}

/**
 * Returns the browser's path and search.
 * @returns The browser's location, without the origin or fragment.
 */
function getLocation(): string {
  return `${window.location.pathname}${window.location.search}`;
}

/**
 * Goes back one history entry and waits for the browser's popstate.
 * @returns A promise that resolves once the browser has gone back.
 */
function goBack(): Promise<void> {
  return new Promise((resolve) => {
    window.addEventListener("popstate", () => resolve(), { once: true });
    window.history.back();
  });
}

beforeEach(() => {
  commits.length = 0;
  replace.mockClear();
  ROUTER.asPath = "/";
  ROUTER.basePath = "";
  ROUTER.isReady = true;
  ROUTER.query = {};
  window.history.replaceState(null, "", "/");
});

// Settle every replace, so no listener outlives its test.
afterEach(async () => {
  await commitAll();
});

describe("useUpdateURLParams", () => {
  it("puts the selected catalog and the explore list back into a URL that lacks them, in one replace", () => {
    ROUTER.asPath = "/projects?catalog=dcp2&list=files";
    ROUTER.query = {
      catalog: "dcp2",
      entityListType: "projects",
      list: "files",
    };
    const { rerender } = renderHook(useUpdateURLParams, { wrapper: Wrapper });
    expect(replace).not.toHaveBeenCalled();

    ROUTER.asPath = "/projects/uuid";
    ROUTER.query = { entityListType: "projects", params: ["uuid"] };
    rerender();

    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: {
          catalog: "dcp2",
          entityListType: "projects",
          list: "files",
          params: ["uuid"],
        },
      },
      "/projects/uuid?catalog=dcp2&list=files",
      { shallow: true },
    );
  });

  it("leaves a URL's catalog alone on a site without a CatalogProvider", () => {
    ROUTER.query = { catalog: "dcp2", entityListType: "projects" };

    renderHook(useUpdateURLParams);

    expect(replace).not.toHaveBeenCalled();
  });

  it("leaves the explore list alone when no ExploreListProvider is mounted", () => {
    ROUTER.query = { entityListType: "projects" };

    renderHook(useUpdateURLParams, { wrapper: CatalogWrapper });

    expect(replace).not.toHaveBeenCalled();
  });

  it("puts back only the explore list when no catalog is selected", () => {
    ROUTER.asPath = "/projects";
    ROUTER.query = { entityListType: "projects" };

    renderHook(useUpdateURLParams, { wrapper: Wrapper });

    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: { entityListType: "projects", list: "projects" },
      },
      "/projects?list=projects",
      { shallow: true },
    );
  });

  it("waits for the router to be ready", () => {
    ROUTER.isReady = false;
    ROUTER.query = {};
    const { rerender } = renderHook(useUpdateURLParams, { wrapper: Wrapper });
    expect(replace).not.toHaveBeenCalled();

    ROUTER.asPath = "/projects";
    ROUTER.isReady = true;
    ROUTER.query = { entityListType: "projects" };
    rerender();

    expect(replace).toHaveBeenCalledTimes(1);
  });
});

describe("useUpdateURLParams with filters", () => {
  it("puts the filters into the URL with the catalog and explore list, keeping the URL's other params", () => {
    ROUTER.asPath = "/export?catalog=dcp2&list=files&other=kept";
    ROUTER.query = { catalog: "dcp2", list: "files", other: "kept" };

    renderHook(() => useUpdateURLParams(FILTER_STATE), { wrapper: Wrapper });

    // A new param is appended after the URL's own.
    const search = new URLSearchParams([
      ["catalog", "dcp2"],
      ["list", "files"],
      ["other", "kept"],
      ["filter", JSON.stringify(FILTER_STATE)],
    ]);
    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: {
          catalog: "dcp2",
          filter: JSON.stringify(FILTER_STATE),
          list: "files",
          other: "kept",
        },
      },
      `/export?${search}`,
      { shallow: true },
    );
  });

  it("leaves a URL whose filters already match alone", () => {
    ROUTER.query = {
      catalog: "dcp2",
      filter: JSON.stringify(FILTER_STATE),
      list: "files",
    };

    renderHook(() => useUpdateURLParams(FILTER_STATE), { wrapper: Wrapper });

    expect(replace).not.toHaveBeenCalled();
  });

  it("leaves an empty filter state out of the URL", () => {
    ROUTER.query = { list: "files" };

    renderHook(() => useUpdateURLParams([]), { wrapper: Wrapper });

    expect(replace).not.toHaveBeenCalled();
  });
});

describe("useUpdateURLParams when the browser leaves the page", () => {
  /**
   * Renders the hook on a detail page that lacks `?list=`.
   * @returns The render result's unmount.
   */
  function renderDetailPage(): { unmount: () => void } {
    ROUTER.asPath = "/projects/uuid";
    ROUTER.query = { entityListType: "projects", params: ["uuid"] };
    return renderHook(useUpdateURLParams, { wrapper: Wrapper });
  }

  it("drops the replace when the user goes back before it writes history", async () => {
    window.history.replaceState(null, "", "/projects?filter=x");
    window.history.pushState({ entry: "detail" }, "", "/projects/uuid");
    const { unmount } = renderDetailPage();
    expect(replace).toHaveBeenCalledTimes(1);

    await act(goBack);
    // The Back's own history write isn't cancelled.
    expect(() =>
      emitBeforeHistoryChange("/projects?filter=x", false),
    ).not.toThrow();
    // Going back unmounts the detail page before the replace commits.
    unmount();

    expect(await commitAll()).toEqual([false]);
    expect(getLocation()).toBe("/projects?filter=x");
  });

  it("drops the replace when the user goes back from a URL with a trailing slash", async () => {
    window.history.replaceState(null, "", "/projects?filter=x");
    window.history.pushState({ entry: "detail" }, "", "/projects/uuid/");
    ROUTER.asPath = "/projects/uuid/";
    ROUTER.query = { entityListType: "projects", params: ["uuid"] };
    const { unmount } = renderHook(useUpdateURLParams, { wrapper: Wrapper });
    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: {
          entityListType: "projects",
          list: "projects",
          params: ["uuid"],
        },
      },
      "/projects/uuid/?list=projects",
      { shallow: true },
    );

    await act(goBack);
    unmount();

    expect(await commitAll()).toEqual([false]);
    expect(getLocation()).toBe("/projects?filter=x");
  });

  it("drops the replace when the browser had already left before the hook ran", async () => {
    window.history.replaceState(null, "", "/projects?filter=x");
    renderDetailPage();

    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: {
          entityListType: "projects",
          list: "projects",
          params: ["uuid"],
        },
      },
      "/projects/uuid?list=projects",
      { shallow: true },
    );
    expect(await commitAll()).toEqual([false]);
    expect(getLocation()).toBe("/projects?filter=x");
  });

  it("drops the replace when the user goes back to the same page with a different search", async () => {
    window.history.replaceState(null, "", "/projects/uuid?catalog=old");
    window.history.pushState({ entry: "detail" }, "", "/projects/uuid");
    renderDetailPage();

    await act(goBack);

    expect(await commitAll()).toEqual([false]);
    expect(getLocation()).toBe("/projects/uuid?catalog=old");
  });

  it("lets a non-shallow navigation to the replace's URL through", () => {
    window.history.replaceState(null, "", "/projects?filter=x");
    renderDetailPage();

    expect(() =>
      emitBeforeHistoryChange("/projects/uuid?list=projects", false),
    ).not.toThrow();
  });

  it("lets another page's shallow replace through while the replace is pending", () => {
    window.history.replaceState(null, "", "/projects?filter=x");
    renderDetailPage();

    expect(() =>
      emitBeforeHistoryChange("/projects?filter=x&list=projects", true),
    ).not.toThrow();
  });

  it("puts the explore list into the URL when the user stays on the page", async () => {
    window.history.replaceState(null, "", "/projects/uuid");
    renderDetailPage();

    expect(await commitAll()).toEqual([true]);
    expect(getLocation()).toBe("/projects/uuid?list=projects");
  });

  it("stops listening once the replace has written history", async () => {
    window.history.replaceState(null, "", "/projects/uuid");
    renderDetailPage();
    await commitAll();

    window.history.replaceState(null, "", "/elsewhere");

    expect(() =>
      emitBeforeHistoryChange("/projects/uuid?list=projects", true),
    ).not.toThrow();
  });
});

describe("useUpdateURLParams URL shape", () => {
  it("keeps the URL's fragment", async () => {
    window.history.replaceState(null, "", "/projects/uuid#section");
    ROUTER.asPath = "/projects/uuid";
    ROUTER.query = { entityListType: "projects", params: ["uuid"] };

    renderHook(useUpdateURLParams, { wrapper: Wrapper });

    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: {
          entityListType: "projects",
          list: "projects",
          params: ["uuid"],
        },
      },
      "/projects/uuid?list=projects#section",
      { shallow: true },
    );
    expect(await commitAll()).toEqual([true]);
    expect(getLocation()).toBe("/projects/uuid?list=projects");
    expect(window.location.hash).toBe("#section");
  });

  it("replaces without the basePath and compares the browser's URL with it", async () => {
    ROUTER.basePath = "/explore";
    window.history.replaceState(null, "", "/explore/projects/uuid");
    ROUTER.asPath = "/projects/uuid";
    ROUTER.query = { entityListType: "projects", params: ["uuid"] };

    renderHook(useUpdateURLParams, { wrapper: Wrapper });

    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: {
          entityListType: "projects",
          list: "projects",
          params: ["uuid"],
        },
      },
      "/projects/uuid?list=projects",
      { shallow: true },
    );
    expect(await commitAll()).toEqual([true]);
    expect(getLocation()).toBe("/explore/projects/uuid?list=projects");
  });
});

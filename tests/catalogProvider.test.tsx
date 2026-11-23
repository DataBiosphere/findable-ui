import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import type { NextRouter } from "next/router";
import type { JSX, ReactNode } from "react";
import { hydrate } from "./utils/hydrate";

const DEFAULT_CATALOG = "default-catalog";

const ROUTER = {
  isReady: true,
  query: {} as NextRouter["query"],
};

const CONFIG: { dataSource?: { defaultParams?: { catalog?: string } } } = {
  dataSource: { defaultParams: { catalog: DEFAULT_CATALOG } },
};

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ROUTER),
}));
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({ config: CONFIG })),
}));

const { CatalogProvider } = await import("../src/providers/catalog/provider");
const { useCatalogParam } = await import("../src/providers/catalog/hook");
const { useCatalog } = await import("../src/hooks/useCatalog");
const { useRenderedCatalog } =
  await import("../src/providers/catalog/hooks/UseRenderedCatalog/hook");
const { VersionInfo } =
  await import("../src/components/Layout/components/Footer/components/VersionInfo/versionInfo");
const { buildStateSyncManagerContext } =
  await import("../src/views/ExploreView/utils");
const { useRestoreCatalogParam } =
  await import("../src/views/ExploreView/hooks/UseRestoreCatalogParam/hook");
const { ExploreActionKind } = await import("../src/providers/exploreState");
const { ROUTER_METHOD } =
  await import("../src/providers/exploreState/actions/stateToUrl/types");

type ExploreState = import("../src/providers/exploreState").ExploreState;

/**
 * Wraps a hook in a CatalogProvider.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns The wrapped children.
 */
function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  return <CatalogProvider>{children}</CatalogProvider>;
}

/**
 * Returns both catalog hooks, for one render.
 * @returns The catalog to request with, and the catalog selected by the URL.
 */
function useCatalogs(): {
  catalog: string | undefined;
  catalogParam: string | undefined;
} {
  return { catalog: useCatalog(), catalogParam: useCatalogParam() };
}

/**
 * Returns the missing-provider warning from a fresh copy of its module, so its once-per-page-load flag is unset.
 * @returns The warning function.
 */
async function importFreshWarning(): Promise<() => void> {
  let warning: (() => void) | undefined;
  await jest.isolateModulesAsync(async () => {
    ({ warnCatalogParamWithoutProvider: warning } =
      await import("../src/providers/catalog/utils"));
  });
  if (!warning) throw new Error("The catalog utils failed to import");
  return warning;
}

/**
 * Sets the browser URL's search string.
 * @param search - Search string, e.g. "?catalog=dcp2".
 */
function setLocationSearch(search: string): void {
  window.history.replaceState(null, "", `/${search}`);
}

/**
 * Renders the catalog from `useRenderedCatalog`, recording the value of every render.
 * @param props - Component props.
 * @param props.renders - Receives the catalog of each render.
 * @returns The catalog.
 */
function RenderedCatalog({
  renders,
}: {
  renders: (string | undefined)[];
}): JSX.Element {
  const catalog = useRenderedCatalog();
  renders.push(catalog);
  return <span>{catalog}</span>;
}

beforeEach(() => {
  ROUTER.isReady = true;
  ROUTER.query = {};
  CONFIG.dataSource = { defaultParams: { catalog: DEFAULT_CATALOG } };
  setLocationSearch("");
});

describe("CatalogProvider", () => {
  it("returns the catalog in the URL", () => {
    ROUTER.query = { catalog: "dcp2" };

    const { result } = renderHook(useCatalogs, { wrapper: Wrapper });

    expect(result.current).toEqual({ catalog: "dcp2", catalogParam: "dcp2" });
  });

  it("starts from the browser URL before the router has the param", () => {
    setLocationSearch("?catalog=dcp4");

    const { result } = renderHook(useCatalogs, { wrapper: Wrapper });

    expect(result.current.catalog).toBe("dcp4");
  });

  it("follows a change to the catalog param", () => {
    ROUTER.query = { catalog: "dcp2" };
    const { rerender, result } = renderHook(useCatalogs, { wrapper: Wrapper });

    ROUTER.query = { catalog: "dcp3" };
    rerender();

    expect(result.current.catalog).toBe("dcp3");
  });

  it("keeps the catalog when the URL drops the param", () => {
    ROUTER.query = { catalog: "dcp2" };
    const { rerender, result } = renderHook(useCatalogs, { wrapper: Wrapper });

    ROUTER.query = {};
    rerender();
    ROUTER.query = { catalog: "" };
    rerender();

    expect(result.current).toEqual({ catalog: "dcp2", catalogParam: "dcp2" });
  });

  it("returns the config default when the URL's catalog param is empty", () => {
    setLocationSearch("?catalog=");
    ROUTER.query = { catalog: "" };

    const { result } = renderHook(useCatalogs, { wrapper: Wrapper });

    expect(result.current).toEqual({
      catalog: DEFAULT_CATALOG,
      catalogParam: undefined,
    });
  });

  it("ignores a repeated catalog param", () => {
    setLocationSearch("?catalog=dcp2&catalog=dcp3");
    ROUTER.query = { catalog: ["dcp2", "dcp3"] };

    const { result } = renderHook(useCatalogs, { wrapper: Wrapper });

    expect(result.current.catalog).toBe(DEFAULT_CATALOG);
  });

  it("returns the config default when the URL has no catalog", () => {
    const { result } = renderHook(useCatalogs, { wrapper: Wrapper });

    expect(result.current).toEqual({
      catalog: DEFAULT_CATALOG,
      catalogParam: undefined,
    });
  });
});

describe("VersionInfo through hydration", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  it("renders the default catalog in the static HTML, then the URL's catalog, without a hydration mismatch", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const renders: (string | undefined)[] = [];

    // The static HTML is built without the URL, so the catalog param is only set once it is rendered.
    const { container, html } = hydrate(
      <Wrapper>
        <VersionInfo />
        <RenderedCatalog renders={renders} />
      </Wrapper>,
      () => {
        setLocationSearch("?catalog=dcp4");
        // Keep only the client's renders.
        renders.length = 0;
      },
    );

    expect(html).toContain(`Unversioned-${DEFAULT_CATALOG}`);
    expect(renders).toEqual([DEFAULT_CATALOG, "dcp4"]);
    expect(container.querySelector(".MuiChip-label")?.textContent).toBe(
      "Unversioned-dcp4",
    );
    expect(consoleError).not.toHaveBeenCalled();
  });
});

describe("useCatalog without CatalogProvider", () => {
  it("returns the config default and ignores the URL's catalog", () => {
    ROUTER.query = { catalog: "dcp2" };

    const { result } = renderHook(useCatalogs);

    expect(result.current).toEqual({
      catalog: DEFAULT_CATALOG,
      catalogParam: undefined,
    });
  });

  it("returns undefined when the config has no catalog", () => {
    CONFIG.dataSource = undefined;

    const { result } = renderHook(useCatalogs);

    expect(result.current.catalog).toBeUndefined();
  });

  it("warns when the URL has a catalog", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    setLocationSearch("?catalog=dcp2");

    renderHook(useCatalogs);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("CatalogProvider");
    warn.mockRestore();
  });
});

describe("warnCatalogParamWithoutProvider", () => {
  it("doesn't warn when the URL has no catalog", async () => {
    const warnCatalogParamWithoutProvider = await importFreshWarning();
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

    warnCatalogParamWithoutProvider();

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("warns once when the URL has a catalog", async () => {
    const warnCatalogParamWithoutProvider = await importFreshWarning();
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    setLocationSearch("?catalog=dcp2");

    warnCatalogParamWithoutProvider();
    warnCatalogParamWithoutProvider();

    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});

describe("buildStateSyncManagerContext", () => {
  const EXPLORE_STATE = {
    entities: {
      projects: {
        entityKey: "projects",
        query: { entityListType: "projects" },
      },
    },
    meta: null,
  } as unknown as ExploreState;

  it("adds the selected catalog to the entity's query", () => {
    const { query } = buildStateSyncManagerContext(
      EXPLORE_STATE,
      "projects",
      "dcp2",
    );

    expect(query).toEqual({ catalog: "dcp2", entityListType: "projects" });
  });

  it("leaves the catalog out when none is selected", () => {
    const { query } = buildStateSyncManagerContext(
      EXPLORE_STATE,
      "projects",
      undefined,
    );

    expect(query).toEqual({ entityListType: "projects" });
  });
});

describe("useRestoreCatalogParam", () => {
  it("replaces the URL from state when the URL lacks the selected catalog", () => {
    const dispatch = jest.fn();
    ROUTER.query = { filter: "[]" };

    renderHook(() => useRestoreCatalogParam("dcp2", dispatch));

    expect(dispatch).toHaveBeenCalledWith({
      payload: { method: ROUTER_METHOD.REPLACE },
      type: ExploreActionKind.StateToUrl,
    });
  });

  it("does nothing when the URL has the catalog", () => {
    const dispatch = jest.fn();
    ROUTER.query = { catalog: "dcp2" };

    renderHook(() => useRestoreCatalogParam("dcp2", dispatch));

    expect(dispatch).not.toHaveBeenCalled();
  });

  it("waits for the router to be ready", () => {
    const dispatch = jest.fn();
    ROUTER.isReady = false;

    renderHook(() => useRestoreCatalogParam("dcp2", dispatch));

    expect(dispatch).not.toHaveBeenCalled();
  });

  it("does nothing when no catalog is selected", () => {
    const dispatch = jest.fn();

    renderHook(() => useRestoreCatalogParam(undefined, dispatch));

    expect(dispatch).not.toHaveBeenCalled();
  });
});

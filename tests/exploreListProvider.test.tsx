import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { NextRouter } from "next/router";
import type { JSX, ReactNode } from "react";
import type { SiteConfig } from "../src/config/entities";
import { hydrate } from "./utils/hydrate";

const ROUTER = {
  isReady: true,
  query: {} as NextRouter["query"],
};

let isServerRender = false;

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ROUTER),
}));
jest.unstable_mockModule("../src/utils/ssr", () => ({
  isSSR: jest.fn(() => isServerRender),
}));
const ALLOWED_LISTS = ["datasets", "files", "projects"];
const INITIAL_LIST = "datasets";

const { ExploreListProvider } =
  await import("../src/providers/exploreList/provider");
const { useExploreList, useOptionalExploreList } =
  await import("../src/providers/exploreList/hook");
const { getAllowedLists, getLocationExploreListParam } =
  await import("../src/providers/exploreList/utils");
const { useSetExploreList } =
  await import("../src/providers/exploreList/hooks/UseSetExploreList/hook");
const { useRenderedExploreList } =
  await import("../src/providers/exploreList/hooks/UseRenderedExploreList/hook");

/**
 * Renders a link to the explore list returned by the given hook, recording the value of every render.
 * @param props - Component props.
 * @param props.renders - Receives the explore list of each render.
 * @param props.useList - Hook returning the explore list to link to.
 * @returns The link.
 */
function ExploreLink({
  renders,
  useList,
}: {
  renders: string[];
  useList: () => string;
}): JSX.Element {
  const exploreList = useList();
  renders.push(exploreList);
  return <a href={`/${exploreList}`}>Explore</a>;
}

/**
 * Renders the link to static HTML with no URL, as the static export does, then hydrates it on a page whose URL has the
 * given search string, as a cold page load does.
 * @param useList - Hook returning the explore list to link to.
 * @param search - Browser URL search string on the client, e.g. "?list=files".
 * @returns The static HTML, the hydrated link, and the explore list of each client render.
 */
function hydrateExploreLink(
  useList: () => string,
  search: string,
): { html: string; link: HTMLAnchorElement; renders: string[] } {
  const renders: string[] = [];
  isServerRender = true;
  const { container, html } = hydrate(
    <Wrapper>
      <ExploreLink renders={renders} useList={useList} />
    </Wrapper>,
    () => {
      isServerRender = false;
      setLocationSearch(search);
      // Keep only the client's renders.
      renders.length = 0;
    },
  );
  const link = container.querySelector("a");
  if (!link) throw new Error("The explore link failed to render");
  return { html, link, renders };
}

/**
 * Wraps a hook in an ExploreListProvider.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns The wrapped children.
 */
function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ExploreListProvider
      allowedLists={ALLOWED_LISTS}
      initialList={INITIAL_LIST}
    >
      {children}
    </ExploreListProvider>
  );
}

/**
 * Sets the browser URL's search string.
 * @param search - Search string, e.g. "?list=files".
 */
function setLocationSearch(search: string): void {
  window.history.replaceState(null, "", `/${search}`);
}

beforeEach(() => {
  isServerRender = false;
  ROUTER.isReady = true;
  ROUTER.query = {};
  setLocationSearch("");
});

describe("ExploreListProvider", () => {
  it("starts from the initial list when the URL has no list param", () => {
    const { result } = renderHook(useExploreList, { wrapper: Wrapper });

    expect(result.current).toBe("datasets");
  });

  it("starts from the browser URL's list param before the router has it", () => {
    setLocationSearch("?list=files");

    const { result } = renderHook(useExploreList, { wrapper: Wrapper });

    expect(result.current).toBe("files");
  });

  it("ignores a list param that is not allowed", () => {
    setLocationSearch("?list=not-an-entity");
    ROUTER.query = { list: "not-an-entity" };

    const { result } = renderHook(useExploreList, { wrapper: Wrapper });

    expect(result.current).toBe("datasets");
  });

  it("ignores a repeated list param", () => {
    setLocationSearch("?list=files&list=projects");
    ROUTER.query = { list: ["files", "projects"] };

    const { result } = renderHook(useExploreList, { wrapper: Wrapper });

    expect(result.current).toBe("datasets");
  });

  it("follows a change to a valid list param", () => {
    ROUTER.query = { list: "files" };
    const { rerender, result } = renderHook(useExploreList, {
      wrapper: Wrapper,
    });
    expect(result.current).toBe("files");

    ROUTER.query = { list: "projects" };
    rerender();

    expect(result.current).toBe("projects");
  });

  it("keeps the explore list when a later URL has no list param", () => {
    ROUTER.query = { list: "files" };
    const { rerender, result } = renderHook(useExploreList, {
      wrapper: Wrapper,
    });

    ROUTER.query = {};
    rerender();

    expect(result.current).toBe("files");
  });

  it("takes the explore page's entity list type, over a list param left in the URL", () => {
    ROUTER.query = { list: "files" };

    const { result } = renderHook(
      () => {
        useSetExploreList("projects");
        return useExploreList();
      },
      { wrapper: Wrapper },
    );

    expect(result.current).toBe("projects");
  });

  it("keeps the explore page's entity list type when the router becomes ready with a list param left in the URL", () => {
    setLocationSearch("?list=files");
    ROUTER.isReady = false;
    const { rerender, result } = renderHook(
      () => {
        useSetExploreList("projects");
        return useExploreList();
      },
      { wrapper: Wrapper },
    );
    expect(result.current).toBe("projects");

    ROUTER.isReady = true;
    ROUTER.query = { list: "files" };
    rerender();

    expect(result.current).toBe("projects");
  });

  it("follows the explore page when the user moves between explore pages", () => {
    const { rerender, result } = renderHook(
      ({ entityListType }) => {
        useSetExploreList(entityListType);
        return useExploreList();
      },
      { initialProps: { entityListType: "files" }, wrapper: Wrapper },
    );
    expect(result.current).toBe("files");

    act(() => rerender({ entityListType: "projects" }));

    expect(result.current).toBe("projects");
  });
});

describe("useRenderedExploreList", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  it("hydrates a link to the static HTML's list, then links to the URL's list, without a hydration mismatch", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { html, link, renders } = hydrateExploreLink(
      useRenderedExploreList,
      "?list=files",
    );

    expect(html).toContain('href="/datasets"');
    expect(renders).toEqual(["datasets", "files"]);
    expect(link.getAttribute("href")).toBe("/files");
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("returns the URL's list in the first render of a component mounted after hydration", () => {
    setLocationSearch("?list=files");
    const renders: string[] = [];

    renderHook(
      () => {
        const exploreList = useRenderedExploreList();
        renders.push(exploreList);
        return exploreList;
      },
      { wrapper: Wrapper },
    );

    expect(renders[0]).toBe("files");
  });
});

// A control for the hydration test above: it shows that test detects a mismatch. It asserts React 19's handling of a
// mismatched attribute (the server value stays, and the mismatch is logged), so a React update can change it.
describe("useExploreList through hydration", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  it("keeps the static HTML's href and reports a hydration mismatch, which useRenderedExploreList avoids", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { link } = hydrateExploreLink(useExploreList, "?list=files");

    expect(link.getAttribute("href")).toBe("/datasets");
    expect(consoleError).toHaveBeenCalled();
  });
});

describe("getAllowedLists", () => {
  it("returns the configured entity routes", () => {
    const config = {
      entities: [{ route: "projects" }, { route: "files" }],
    } as unknown as SiteConfig;

    expect(getAllowedLists(config)).toEqual(["projects", "files"]);
  });
});

describe("getLocationExploreListParam", () => {
  it("returns undefined during server rendering, without reading the browser URL", () => {
    isServerRender = true;
    setLocationSearch("?list=files");

    expect(getLocationExploreListParam()).toBeUndefined();
  });
});

describe("explore list hooks without ExploreListProvider", () => {
  it("useExploreList throws an error naming ExploreListProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(useExploreList)).toThrow("ExploreListProvider");

    jest.mocked(console.error).mockRestore();
  });

  it("useRenderedExploreList throws an error naming ExploreListProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(useRenderedExploreList)).toThrow(
      "ExploreListProvider",
    );

    jest.mocked(console.error).mockRestore();
  });

  it("useOptionalExploreList returns undefined", () => {
    const { result } = renderHook(useOptionalExploreList);

    expect(result.current).toBeUndefined();
  });

  it("useSetExploreList does nothing", () => {
    expect(() => renderHook(() => useSetExploreList("files"))).not.toThrow();
  });
});

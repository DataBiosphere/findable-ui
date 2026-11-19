import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { NextRouter } from "next/router";
import type { JSX, ReactNode } from "react";
import type { SiteConfig } from "../src/config/entities";

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

  it("useOptionalExploreList returns undefined", () => {
    const { result } = renderHook(useOptionalExploreList);

    expect(result.current).toBeUndefined();
  });

  it("useSetExploreList does nothing", () => {
    expect(() => renderHook(() => useSetExploreList("files"))).not.toThrow();
  });
});

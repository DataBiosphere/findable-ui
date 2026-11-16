import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import type { SelectedFilter } from "../src/common/entities";

const FILTER_STATE: SelectedFilter[] = [
  { categoryKey: "fileFormat", value: ["bam"] },
];

const replace = jest.fn();
const LOCATION = { search: "" };

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ basePath: "", replace })),
}));
jest.unstable_mockModule("../src/hooks/useLocation", () => ({
  useLocation: jest.fn(() => ({
    href: `http://localhost/export${LOCATION.search}`,
    pathname: "/export",
    search: new URLSearchParams(LOCATION.search),
  })),
}));

const { useURLFilterParams } = await import("../src/hooks/useURLFilterParams");

beforeEach(() => {
  replace.mockClear();
  LOCATION.search = "";
});

describe("useURLFilterParams updateFilterQueryString", () => {
  it("writes the catalog, the explore origin and the filters when the URL lacks them", () => {
    const { result } = renderHook(useURLFilterParams);

    result.current.updateFilterQueryString("dcp2", "files", FILTER_STATE);

    expect(replace).toHaveBeenCalledWith(
      {
        pathname: "/export",
        query: {
          catalog: "dcp2",
          filter: JSON.stringify(FILTER_STATE),
          from: "files",
        },
      },
      undefined,
      { shallow: true },
    );
  });

  it("writes the explore origin when only it is missing", () => {
    LOCATION.search = "?catalog=dcp2";
    const { result } = renderHook(useURLFilterParams);

    result.current.updateFilterQueryString("dcp2", "files", []);

    expect(replace).toHaveBeenCalledWith(
      { pathname: "/export", query: { catalog: "dcp2", from: "files" } },
      undefined,
      { shallow: true },
    );
  });

  it("leaves a URL that already matches alone", () => {
    LOCATION.search = "?catalog=dcp2&from=files";
    const { result } = renderHook(useURLFilterParams);

    result.current.updateFilterQueryString("dcp2", "files", []);

    expect(replace).not.toHaveBeenCalled();
  });
});

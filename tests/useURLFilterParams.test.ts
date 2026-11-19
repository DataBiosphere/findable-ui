import { renderHook } from "@testing-library/react";
import type { SelectedFilter } from "../src/common/entities";
import { useURLFilterParams } from "../src/hooks/useURLFilterParams/hook";

const FILTER_PARAM = JSON.stringify([
  { categoryKey: "fileFormat", value: ["bam"] },
] satisfies SelectedFilter[]);

/**
 * Sets the browser URL's search string.
 * @param search - Search string, e.g. "?filter=[]".
 */
function setLocationSearch(search: string): void {
  window.history.replaceState(null, "", `/${search}`);
}

describe("useURLFilterParams", () => {
  it("returns the browser URL's filter param", () => {
    setLocationSearch(`?filter=${encodeURIComponent(FILTER_PARAM)}`);

    const { result } = renderHook(useURLFilterParams);

    expect(result.current.decodedFilterParam).toBe(FILTER_PARAM);
  });

  it("returns an empty filter list when the URL has no filter", () => {
    setLocationSearch("");

    const { result } = renderHook(useURLFilterParams);

    expect(result.current.decodedFilterParam).toBe("[]");
  });
});

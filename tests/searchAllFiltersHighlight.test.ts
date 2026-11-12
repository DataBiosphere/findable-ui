import {
  DIVIDER_ITEM,
  NO_RESULTS_ITEM,
  STEP,
} from "../src/components/Filter/components/SearchAllFilters/common/constants";
import {
  ITEM_TYPE,
  SearchAllFiltersItem,
  ValueItem,
} from "../src/components/Filter/components/SearchAllFilters/common/entities";
import {
  findValueIndex,
  getNextValueIndex,
  getTermToFocus,
} from "../src/components/Filter/components/SearchAllFilters/hooks/UseHighlight/utils";

// Header, value a, value b, divider, header, value c.
const ITEMS: SearchAllFiltersItem[] = [
  categoryItem("x"),
  valueItem("a"),
  valueItem("b"),
  DIVIDER_ITEM,
  categoryItem("y"),
  valueItem("c"),
];

describe("getNextValueIndex", () => {
  it.each([
    ["the first value from no highlight", -1, STEP.NEXT, 1],
    ["the last value from no highlight", -1, STEP.PREVIOUS, 5],
    ["the next value in a category", 1, STEP.NEXT, 2],
    ["the next value past a divider and header", 2, STEP.NEXT, 5],
    ["the previous value past a divider and header", 5, STEP.PREVIOUS, 2],
    ["the first value after the last", 5, STEP.NEXT, 1],
    ["the last value before the first", 1, STEP.PREVIOUS, 5],
  ])("moves to %s", (_, index, step, expected) => {
    expect(getNextValueIndex(ITEMS, index, step)).toBe(expected);
  });

  it("returns -1 when the list has no values", () => {
    expect(getNextValueIndex([NO_RESULTS_ITEM], -1, STEP.NEXT)).toBe(-1);
  });
});

describe("findValueIndex", () => {
  it("returns the index of the value with the key", () => {
    expect(findValueIndex(ITEMS, "c")).toBe(5);
  });

  it("returns -1 for no key, a missing key, or a category key", () => {
    expect(findValueIndex(ITEMS, null)).toBe(-1);
    expect(findValueIndex(ITEMS, "z")).toBe(-1);
    expect(findValueIndex(ITEMS, "x")).toBe(-1);
  });
});

describe("getTermToFocus", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("returns the highlighted term when it is rendered", () => {
    const input = renderList();
    expect(getTermToFocus(input, "second")?.id).toBe("second");
  });

  it("returns the first rendered term when nothing is highlighted, or the highlighted term isn't rendered", () => {
    const input = renderList();
    expect(getTermToFocus(input, undefined)?.id).toBe("first");
    expect(getTermToFocus(input, "unrendered")?.id).toBe("first");
  });
});

/**
 * Renders a search input controlling a list of two terms.
 * @returns The search input.
 */
function renderList(): HTMLInputElement {
  document.body.innerHTML = `
    <input aria-controls="listbox" />
    <ul id="listbox" role="listbox">
      <li id="first" role="option"></li>
      <li id="second" role="option"></li>
    </ul>`;
  return document.querySelector("input") as HTMLInputElement;
}

/**
 * Returns a category list item.
 * @param key - Item key.
 * @returns The category item.
 */
function categoryItem(key: string): SearchAllFiltersItem {
  return { categoryLabel: key, key, type: ITEM_TYPE.CATEGORY };
}

/**
 * Returns a value list item.
 * @param key - Item key.
 * @returns The value item.
 */
function valueItem(key: string): ValueItem {
  return {
    categoryKey: "category",
    categoryLabel: "Category",
    key,
    type: ITEM_TYPE.VALUE,
    value: { count: 1, key, label: key, selected: false },
  };
}

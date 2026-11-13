import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import type { ComponentType, CSSProperties, JSX } from "react";
import type { ListChildComponentProps } from "react-window";
import { SelectCategoryView } from "../src/common/entities";
import { applyMenuFilter } from "../src/components/Filter/components/SearchAllFilters/common/utils";
import { SURFACE_TYPE } from "../src/components/Filter/components/surfaces/types";
import { TEST_IDS } from "../src/tests/testIds";

// react-window caches each row's style object and hands the same object back on
// every render; freezing it makes any mutation by a row renderer throw.
const ROW_STYLE: CSSProperties = Object.freeze({
  height: 40,
  left: 0,
  position: "absolute",
  top: 0,
  width: "100%",
});

interface MockListProps {
  children: ComponentType<ListChildComponentProps>;
  itemCount: number;
  itemData: unknown;
}

jest.unstable_mockModule("react-window", () => ({
  VariableSizeList: ({
    children: Row,
    itemCount,
    itemData,
  }: MockListProps): JSX.Element => (
    <div>
      {Array.from({ length: itemCount }, (_, index) => (
        <Row data={itemData} index={index} key={index} style={ROW_STYLE} />
      ))}
    </div>
  ),
}));

const { VariableSizeList } =
  await import("../src/components/Filter/components/SearchAllFilters/components/VariableSizeList/VariableSizeList");

const SELECT_CATEGORY_VIEWS: SelectCategoryView[] = [
  {
    key: "disease",
    label: "Disease",
    values: [{ count: 1, key: "flu", label: "Flu", selected: false }],
  },
  {
    key: "organ",
    label: "Organ",
    values: [{ count: 2, key: "heart", label: "Heart", selected: false }],
  },
];

describe("SearchAllFilters VariableSizeList", () => {
  it("should render rows without mutating react-window's row style", () => {
    render(
      <VariableSizeList
        autocompleteListProps={{}}
        filteredItems={applyMenuFilter(SELECT_CATEGORY_VIEWS, "")}
        highlightedIndex={-1}
        onFilter={jest.fn()}
        optionIdPrefix="search-all-filters-option"
        searchTerm=""
        surfaceType={SURFACE_TYPE.POPPER_MENU}
      />,
    );
    // The two categories are separated by a divider, which takes the same style.
    // The divider is hidden from assistive tech, so the query includes hidden elements.
    expect(screen.getByRole("separator", { hidden: true }).style.height).toBe(
      "",
    );
    const items = screen.getAllByTestId(TEST_IDS.FILTER_ITEM);
    expect(items).toHaveLength(2);
    for (const item of items) {
      expect(item.style.height).toBe("");
      expect(item.style.top).toBe("0px");
    }
  });
});

import { jest } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { VIEW_KIND } from "../src/common/categories/views/types";
import * as stories from "../src/components/Filter/components/FilterRange/stories/filterRange.stories";
import { MUI_CLASSES } from "../src/tests/mui/constants";
import { TEST_IDS } from "../src/tests/testIds";
import { getClassNames } from "../src/utils/tests";

const BETWEEN = "Between";
const GREATER_THAN = "Greater Than";
const LESS_THAN = "Less Than";

const { Default } = composeStories(stories);

const SELECTORS = {
  MAX_INPUT: 'input[name="max"]',
  MAX_LABEL: 'label[for="max"]',
  MIN_INPUT: 'input[name="min"]',
  MIN_LABEL: 'label[for="min"]',
};

const TEST_VALUES = {
  CATEGORY_KEY: Default.args.categoryKey,
  MAX: Default.args.max,
  MIN: Default.args.min,
  ON_FILTER: jest.fn(),
  SELECTED_MAX: 226,
  SELECTED_MIN: 112,
  UNIT: Default.args.unit,
};

describe("FilterRange", () => {
  let filterEl: HTMLFormElement;
  let maxInputEl: HTMLInputElement | null;
  let minInputEl: HTMLInputElement | null;
  let maxLabelEl: HTMLLabelElement | null;
  let minLabelEl: HTMLLabelElement | null;
  let helperEls: HTMLCollectionOf<Element>;

  describe("UI rendering for operator modes", () => {
    beforeEach(() => {
      render(<Default />);
      filterEl = screen.getByTestId(TEST_IDS.FILTER_RANGE);
      expect(filterEl).toBeDefined();
      maxInputEl = filterEl.querySelector(
        SELECTORS.MAX_INPUT
      ) as HTMLInputElement | null;
      minInputEl = filterEl.querySelector(
        SELECTORS.MIN_INPUT
      ) as HTMLInputElement | null;
      maxLabelEl = filterEl.querySelector(
        SELECTORS.MAX_LABEL
      ) as HTMLLabelElement | null;
      minLabelEl = filterEl.querySelector(
        SELECTORS.MIN_LABEL
      ) as HTMLLabelElement | null;
      helperEls = filterEl.getElementsByClassName(MUI_CLASSES.FORM_HELPER_TEXT);
    });

    describe("Operator BETWEEN", () => {
      it("renders the toggle buttons with correct text", () => {
        expect(screen.getByRole("button", { name: BETWEEN })).toBeDefined();
        expect(screen.getByRole("button", { name: LESS_THAN })).toBeDefined();
        expect(
          screen.getByRole("button", { name: GREATER_THAN })
        ).toBeDefined();
      });

      it("renders BETWEEN toggle button as selected", () => {
        expect(
          getClassNames(screen.getByRole("button", { name: BETWEEN }))
        ).toContain(MUI_CLASSES.SELECTED);
      });

      it("renders BETWEEN input fields with correct labels", () => {
        expect(filterEl.querySelectorAll("label")).toHaveLength(2);
        expect(filterEl.querySelectorAll("input")).toHaveLength(2);
        expect(minInputEl).not.toBeNull();
        expect(maxInputEl).not.toBeNull();
        expect(minLabelEl).not.toBeNull();
        expect(minLabelEl?.textContent).toEqual(`Min (${TEST_VALUES.UNIT})`);
        expect(maxLabelEl).not.toBeNull();
        expect(maxLabelEl?.textContent).toEqual(`Max (${TEST_VALUES.UNIT})`);
      });

      it("renders helper text for each input", () => {
        expect(helperEls).toHaveLength(2);
        expect(helperEls[0].textContent).toEqual(
          `Min allowed: ${TEST_VALUES.MIN}`
        );
        expect(helperEls[1].textContent).toEqual(
          `Max allowed: ${TEST_VALUES.MAX}`
        );
      });

      it("renders filter button", () => {
        expect(screen.getByText("Filter")).toBeDefined();
      });
    });

    describe("Operator LESS THAN", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: LESS_THAN }));
      });

      it("renders LESS THAN toggle button as selected", () => {
        expect(
          getClassNames(screen.getByRole("button", { name: LESS_THAN }))
        ).toContain(MUI_CLASSES.SELECTED);
      });

      it("renders LESS THAN input field with correct label", () => {
        expect(filterEl.querySelectorAll("label")).toHaveLength(1);
        expect(filterEl.querySelectorAll("input")).toHaveLength(1);
        expect(maxInputEl).not.toBeNull();
        expect(maxLabelEl).not.toBeNull();
        expect(maxLabelEl?.textContent).toEqual(
          `Less Than (${TEST_VALUES.UNIT})`
        );
      });

      it("renders helper text", () => {
        expect(helperEls).toHaveLength(1);
        expect(helperEls[0].textContent).toEqual(
          `Allowed values: \u2265 ${TEST_VALUES.MIN} and \u2264 ${TEST_VALUES.MAX}`
        );
      });
    });

    describe("Operator GREATER THAN", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: GREATER_THAN }));
      });

      it("renders GREATER THAN toggle button as selected", () => {
        expect(
          getClassNames(screen.getByRole("button", { name: GREATER_THAN }))
        ).toContain(MUI_CLASSES.SELECTED);
      });

      it("renders GREATER THAN input field with correct label", () => {
        expect(filterEl.querySelectorAll("label")).toHaveLength(1);
        expect(filterEl.querySelectorAll("input")).toHaveLength(1);
        expect(minInputEl).not.toBeNull();
        expect(minLabelEl).not.toBeNull();
        expect(minLabelEl?.textContent).toEqual(
          `Greater Than (${TEST_VALUES.UNIT})`
        );
      });

      it("renders helper text", () => {
        expect(helperEls).toHaveLength(1);
        expect(helperEls[0].textContent).toEqual(
          `Allowed values: \u2265 ${TEST_VALUES.MIN} and \u2264 ${TEST_VALUES.MAX}`
        );
      });
    });
  });

  describe("Input rendering for selectedMin and selectedMax combinations", () => {
    it("renders both min and max inputs with selected values when both selectedMin and selectedMax are defined", () => {
      render(
        <Default
          selectedMax={TEST_VALUES.SELECTED_MAX}
          selectedMin={TEST_VALUES.SELECTED_MIN}
        />
      );
      const filterEl = screen.getByTestId(TEST_IDS.FILTER_RANGE);
      expect(
        getClassNames(screen.getByRole("button", { name: BETWEEN }))
      ).toContain(MUI_CLASSES.SELECTED);
      expect(
        (filterEl.querySelector(SELECTORS.MIN_INPUT) as HTMLInputElement).value
      ).toEqual(TEST_VALUES.SELECTED_MIN.toString());
      expect(
        (filterEl.querySelector(SELECTORS.MAX_INPUT) as HTMLInputElement).value
      ).toEqual(TEST_VALUES.SELECTED_MAX.toString());
    });

    it("renders only min input with selected value when only selectedMin is defined", () => {
      render(
        <Default selectedMax={null} selectedMin={TEST_VALUES.SELECTED_MIN} />
      );
      const filterEl = screen.getByTestId(TEST_IDS.FILTER_RANGE);
      expect(
        getClassNames(screen.getByRole("button", { name: GREATER_THAN }))
      ).toContain(MUI_CLASSES.SELECTED);
      expect(
        (filterEl.querySelector(SELECTORS.MIN_INPUT) as HTMLInputElement).value
      ).toEqual(TEST_VALUES.SELECTED_MIN.toString());
    });

    it("renders only max input with selected value when only selectedMax is defined", () => {
      render(
        <Default selectedMax={TEST_VALUES.SELECTED_MAX} selectedMin={null} />
      );
      const filterEl = screen.getByTestId(TEST_IDS.FILTER_RANGE);
      expect(
        getClassNames(screen.getByRole("button", { name: LESS_THAN }))
      ).toContain(MUI_CLASSES.SELECTED);
      expect(
        (filterEl.querySelector(SELECTORS.MAX_INPUT) as HTMLInputElement).value
      ).toEqual(TEST_VALUES.SELECTED_MAX.toString());
    });
  });

  describe("Filter button interaction", () => {
    it("calls onFilter with correct values when min and max are selected", async () => {
      render(
        <Default
          selectedMin={TEST_VALUES.SELECTED_MIN}
          selectedMax={TEST_VALUES.SELECTED_MAX}
          onFilter={TEST_VALUES.ON_FILTER}
        />
      );
      fireEvent.click(screen.getByText("Filter"));
      await waitFor(() => {
        expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(1);
        expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledWith(
          TEST_VALUES.CATEGORY_KEY,
          [TEST_VALUES.SELECTED_MIN, TEST_VALUES.SELECTED_MAX],
          true,
          undefined,
          VIEW_KIND.RANGE
        );
      });
    });

    it("calls onFilter with only min when only min is selected", async () => {
      render(
        <Default
          selectedMin={TEST_VALUES.SELECTED_MIN}
          selectedMax={null}
          onFilter={TEST_VALUES.ON_FILTER}
        />
      );
      fireEvent.click(screen.getByText("Filter"));
      await waitFor(() => {
        expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledWith(
          TEST_VALUES.CATEGORY_KEY,
          [TEST_VALUES.SELECTED_MIN, null],
          true,
          undefined,
          VIEW_KIND.RANGE
        );
      });
    });

    it("calls onFilter with only max when only max is selected", async () => {
      render(
        <Default
          selectedMin={null}
          selectedMax={TEST_VALUES.SELECTED_MAX}
          onFilter={TEST_VALUES.ON_FILTER}
        />
      );
      fireEvent.click(screen.getByText("Filter"));
      await waitFor(() => {
        expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledWith(
          TEST_VALUES.CATEGORY_KEY,
          [null, TEST_VALUES.SELECTED_MAX],
          true,
          undefined,
          VIEW_KIND.RANGE
        );
      });
    });
  });
});

import { jest } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { VIEW_KIND } from "../src/common/categories/views/types";
import * as stories from "../src/components/Filter/components/FilterRange/stories/filterRange.stories";
import { MUI_CLASSES } from "../src/tests/mui/constants";
import { TEST_IDS } from "../src/tests/testIds";
import { getButton, getLabelText, getText } from "../src/tests/utils";
import { getClassNames } from "../src/utils/tests";

const BETWEEN = "Between";
const GREATER_THAN = "Greater Than";
const LESS_THAN = "Less Than";

const { Default } = composeStories(stories);

const TEST_VALUES = {
  CATEGORY_KEY: Default.args.categoryKey,
  MAX: Default.args.max,
  MIN: Default.args.min,
  ON_FILTER: jest.fn(),
  SELECTED_MAX: 226,
  SELECTED_MIN: 112,
  UNIT: Default.args.unit,
};

const LABEL_TEXTS = {
  GREATER_THAN: `Greater Than (${TEST_VALUES.UNIT})`,
  LESS_THAN: `Less Than (${TEST_VALUES.UNIT})`,
  MAX: `Max (${TEST_VALUES.UNIT})`,
  MIN: `Min (${TEST_VALUES.UNIT})`,
};

const HELPER_TEXTS = {
  GREATER_THAN: `Allowed values: \u2265 ${TEST_VALUES.MIN} and \u2264 ${TEST_VALUES.MAX}`,
  LESS_THAN: `Allowed values: \u2265 ${TEST_VALUES.MIN} and \u2264 ${TEST_VALUES.MAX}`,
  MAX: `Max allowed: ${TEST_VALUES.MAX}`,
  MIN: `Min allowed: ${TEST_VALUES.MIN}`,
};

const ERROR_TEXTS = {
  MIN_MAX_ERROR: "Min must be less than max",
  REQUIRED_ERROR: "Value is required",
  TYPE_ERROR: "Value must be a number",
};

const DESCRIBE_TITLES = {
  BETWEEN: "Operator BETWEEN",
  GREATER_THAN: "Operator GREATER THAN",
  LESS_THAN: "Operator LESS THAN",
};

/**
 * Tests for the FilterRange component.
 * Excludes tests for min/max values outside of allowed range; the allowed range is not currently validated.
 */

describe("FilterRange", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("UI rendering for operator modes", () => {
    let filterEl: HTMLFormElement;

    beforeEach(() => {
      render(<Default />);
      filterEl = screen.getByTestId(TEST_IDS.FILTER_RANGE);
      expect(filterEl).toBeDefined();
    });

    describe(DESCRIBE_TITLES.BETWEEN, () => {
      it("renders the toggle buttons with correct text", () => {
        expect(getButton(BETWEEN)).toBeDefined();
        expect(getButton(LESS_THAN)).toBeDefined();
        expect(getButton(GREATER_THAN)).toBeDefined();
      });

      it("renders BETWEEN toggle button as selected", () => {
        expect(getClassNames(getButton(BETWEEN))).toContain(
          MUI_CLASSES.SELECTED
        );
      });

      it("renders BETWEEN input fields with correct labels", () => {
        expect(filterEl.querySelectorAll("label")).toHaveLength(2);
        expect(filterEl.querySelectorAll("input")).toHaveLength(2);
        expect(getLabelText(LABEL_TEXTS.MIN)).toBeDefined();
        expect(getLabelText(LABEL_TEXTS.MAX)).toBeDefined();
        expect(getText(LABEL_TEXTS.MIN)).toBeDefined();
        expect(getText(LABEL_TEXTS.MAX)).toBeDefined();
      });

      it("renders helper text for each input", () => {
        expect(getText(HELPER_TEXTS.MIN)).toBeDefined();
        expect(getText(HELPER_TEXTS.MAX)).toBeDefined();
      });

      it("renders filter button", () => {
        expect(getFilterButton()).toBeDefined();
      });
    });

    describe(DESCRIBE_TITLES.LESS_THAN, () => {
      beforeEach(() => {
        fireEvent.click(getButton(LESS_THAN));
      });

      it("renders LESS THAN toggle button as selected", () => {
        expect(getClassNames(getButton(LESS_THAN))).toContain(
          MUI_CLASSES.SELECTED
        );
      });

      it("renders LESS THAN input field with correct label", () => {
        expect(filterEl.querySelectorAll("label")).toHaveLength(1);
        expect(filterEl.querySelectorAll("input")).toHaveLength(1);
        expect(getLabelText(LABEL_TEXTS.LESS_THAN)).toBeDefined();
        expect(getText(LABEL_TEXTS.LESS_THAN)).toBeDefined();
      });

      it("renders helper text", () => {
        expect(getText(HELPER_TEXTS.LESS_THAN)).toBeDefined();
      });
    });

    describe(DESCRIBE_TITLES.GREATER_THAN, () => {
      beforeEach(() => {
        fireEvent.click(getButton(GREATER_THAN));
      });

      it("renders GREATER THAN toggle button as selected", () => {
        expect(getClassNames(getButton(GREATER_THAN))).toContain(
          MUI_CLASSES.SELECTED
        );
      });

      it("renders GREATER THAN input field with correct label", () => {
        expect(filterEl.querySelectorAll("label")).toHaveLength(1);
        expect(filterEl.querySelectorAll("input")).toHaveLength(1);
        expect(getLabelText(LABEL_TEXTS.GREATER_THAN)).toBeDefined();
        expect(getText(LABEL_TEXTS.GREATER_THAN)).toBeDefined();
      });

      it("renders helper text", () => {
        expect(getText(HELPER_TEXTS.GREATER_THAN)).toBeDefined();
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
      expect(getClassNames(getButton(BETWEEN))).toContain(MUI_CLASSES.SELECTED);
      expect(getLabelText<HTMLInputElement>(LABEL_TEXTS.MIN).value).toEqual(
        TEST_VALUES.SELECTED_MIN.toString()
      );
      expect(getLabelText<HTMLInputElement>(LABEL_TEXTS.MAX).value).toEqual(
        TEST_VALUES.SELECTED_MAX.toString()
      );
    });

    it("renders min input with selected value when only selectedMin is defined", () => {
      render(
        <Default selectedMax={null} selectedMin={TEST_VALUES.SELECTED_MIN} />
      );
      expect(getClassNames(getButton(GREATER_THAN))).toContain(
        MUI_CLASSES.SELECTED
      );
      expect(
        getLabelText<HTMLInputElement>(LABEL_TEXTS.GREATER_THAN).value
      ).toEqual(TEST_VALUES.SELECTED_MIN.toString());
    });

    it("renders max input with selected value when only selectedMax is defined", () => {
      render(
        <Default selectedMax={TEST_VALUES.SELECTED_MAX} selectedMin={null} />
      );
      expect(getClassNames(getButton(LESS_THAN))).toContain(
        MUI_CLASSES.SELECTED
      );
      expect(
        getLabelText<HTMLInputElement>(LABEL_TEXTS.LESS_THAN).value
      ).toEqual(TEST_VALUES.SELECTED_MAX.toString());
    });
  });

  describe("Filter button interaction", () => {
    describe(DESCRIBE_TITLES.BETWEEN, () => {
      it("calls onFilter with correct values when min and max are selected", async () => {
        render(
          <Default
            selectedMin={TEST_VALUES.SELECTED_MIN}
            selectedMax={TEST_VALUES.SELECTED_MAX}
            onFilter={TEST_VALUES.ON_FILTER}
          />
        );
        fireEvent.click(getFilterButton());
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

      it("calls onFilter with correct values when only min is selected", async () => {
        render(
          <Default
            selectedMin={TEST_VALUES.SELECTED_MIN}
            selectedMax={null}
            onFilter={TEST_VALUES.ON_FILTER}
          />
        );
        fireEvent.click(getFilterButton());
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

      it("calls onFilter with correct values when only max is selected", async () => {
        render(
          <Default
            selectedMin={null}
            selectedMax={TEST_VALUES.SELECTED_MAX}
            onFilter={TEST_VALUES.ON_FILTER}
          />
        );
        fireEvent.click(getFilterButton());
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

  describe("Error states", () => {
    const STRING_VALUE = { target: { value: "test" } }; // Updater of input value from number to string value "test".

    describe(DESCRIBE_TITLES.BETWEEN, () => {
      it("shows error when min and max are missing", async () => {
        render(<Default selectedMin={null} selectedMax={null} />);
        fireEvent.click(getFilterButton());
        await waitFor(() => {
          expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(0);
          expect(getText("Min or Max is required")).toBeDefined();
        });
      });

      it("shows error when min is not a number", async () => {
        render(
          <Default
            selectedMin={TEST_VALUES.SELECTED_MIN}
            selectedMax={TEST_VALUES.SELECTED_MAX}
          />
        );
        fireEvent.change(getLabelText(LABEL_TEXTS.MIN), STRING_VALUE);
        fireEvent.click(getFilterButton());
        await waitFor(() => {
          expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(0);
          expect(getText(ERROR_TEXTS.TYPE_ERROR)).toBeDefined();
        });
      });

      it("shows error when max is not a number", async () => {
        render(
          <Default
            selectedMin={TEST_VALUES.SELECTED_MIN}
            selectedMax={TEST_VALUES.SELECTED_MAX}
          />
        );
        fireEvent.change(getLabelText(LABEL_TEXTS.MAX), STRING_VALUE);
        fireEvent.click(getFilterButton());
        await waitFor(() => {
          expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(0);
          expect(getText(ERROR_TEXTS.TYPE_ERROR)).toBeDefined();
        });
      });

      it("shows error when min is greater than max", async () => {
        render(
          <Default
            selectedMin={TEST_VALUES.SELECTED_MAX}
            selectedMax={TEST_VALUES.SELECTED_MIN}
          />
        );
        fireEvent.click(getFilterButton());
        await waitFor(() => {
          expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(0);
          expect(getText(ERROR_TEXTS.MIN_MAX_ERROR)).toBeDefined();
        });
      });
    });

    describe(DESCRIBE_TITLES.LESS_THAN, () => {
      beforeEach(() => {
        render(<Default selectedMin={null} selectedMax={null} />);
        fireEvent.click(getButton(LESS_THAN));
      });
      it("shows error when required max is missing", async () => {
        fireEvent.click(getFilterButton());
        await waitFor(() => {
          expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(0);
          expect(getText(ERROR_TEXTS.REQUIRED_ERROR)).toBeDefined();
        });
      });

      it("shows error when required max is not a number", async () => {
        fireEvent.change(getLabelText(LABEL_TEXTS.LESS_THAN), STRING_VALUE);
        fireEvent.click(getFilterButton());
        await waitFor(() => {
          expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(0);
          expect(getText(ERROR_TEXTS.TYPE_ERROR)).toBeDefined();
        });
      });
    });

    describe(DESCRIBE_TITLES.GREATER_THAN, () => {
      beforeEach(() => {
        render(<Default selectedMin={null} selectedMax={null} />);
        fireEvent.click(getButton(GREATER_THAN));
      });

      it("shows error when required min is missing", async () => {
        fireEvent.click(getFilterButton());
        await waitFor(() => {
          expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(0);
          expect(getText(ERROR_TEXTS.REQUIRED_ERROR)).toBeDefined();
        });
      });

      it("shows error when required min is not a number", async () => {
        fireEvent.change(getLabelText(LABEL_TEXTS.GREATER_THAN), STRING_VALUE);
        fireEvent.click(getFilterButton());
        await waitFor(() => {
          expect(TEST_VALUES.ON_FILTER).toHaveBeenCalledTimes(0);
          expect(getText(ERROR_TEXTS.TYPE_ERROR)).toBeDefined();
        });
      });
    });
  });
});

/**
 * Retrieves the filter button.
 * @returns The filter button element.
 */
function getFilterButton(): HTMLElement {
  return getButton("Filter");
}

import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as stories from "../src/components/Filter/components/FilterRange/stories/filterRange.stories";
import { MUI_CLASSES } from "../src/tests/mui/constants";
import { TEST_IDS } from "../src/tests/testIds";
import { getClassNames } from "../src/utils/tests";

const BETWEEN = "Between";
const GREATER_THAN = "Greater Than";
const LESS_THAN = "Less Than";

const { Default } = composeStories(stories);

const MAX = Default.args.max;
const MIN = Default.args.min;
const UNIT = Default.args.unit;

describe("FilterRange", () => {
  let filterEl: HTMLFormElement;
  let maxInputEl: HTMLInputElement | null;
  let minInputEl: HTMLInputElement | null;
  let maxLabelEl: HTMLLabelElement | null;
  let minLabelEl: HTMLLabelElement | null;
  let helperEls: HTMLCollectionOf<Element>;

  beforeEach(() => {
    render(<Default />);
    filterEl = screen.getByTestId(TEST_IDS.FILTER_RANGE);
    expect(filterEl).toBeDefined();
    maxInputEl = filterEl.querySelector(
      'input[name="max"]'
    ) as HTMLInputElement | null;
    minInputEl = filterEl.querySelector(
      'input[name="min"]'
    ) as HTMLInputElement | null;
    maxLabelEl = filterEl.querySelector(
      'label[for="max"]'
    ) as HTMLLabelElement | null;
    minLabelEl = filterEl.querySelector(
      'label[for="min"]'
    ) as HTMLLabelElement | null;
    helperEls = filterEl.getElementsByClassName(MUI_CLASSES.FORM_HELPER_TEXT);
  });

  describe("Operator BETWEEN", () => {
    it("renders the toggle buttons with correct text", () => {
      expect(screen.getByRole("button", { name: BETWEEN })).toBeDefined();
      expect(screen.getByRole("button", { name: LESS_THAN })).toBeDefined();
      expect(screen.getByRole("button", { name: GREATER_THAN })).toBeDefined();
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
      expect(minLabelEl?.textContent).toEqual(`Min (${UNIT})`);
      expect(maxLabelEl).not.toBeNull();
      expect(maxLabelEl?.textContent).toEqual(`Max (${UNIT})`);
    });

    it("renders helper text for each input", () => {
      expect(helperEls).toHaveLength(2);
      expect(helperEls[0].textContent).toEqual(`Min allowed: ${MIN}`);
      expect(helperEls[1].textContent).toEqual(`Max allowed: ${MAX}`);
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
      expect(maxLabelEl?.textContent).toEqual(`Less Than (${UNIT})`);
    });

    it("renders helper text", () => {
      expect(helperEls).toHaveLength(1);
      expect(helperEls[0].textContent).toEqual(
        `Allowed values: \u2265 ${MIN} and \u2264 ${MAX}`
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
      expect(minLabelEl?.textContent).toEqual(`Greater Than (${UNIT})`);
    });

    it("renders helper text", () => {
      expect(helperEls).toHaveLength(1);
      expect(helperEls[0].textContent).toEqual(
        `Allowed values: \u2265 ${MIN} and \u2264 ${MAX}`
      );
    });
  });
});

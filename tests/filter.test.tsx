import { jest } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { VIEW_KIND } from "../src/common/categories/views/types";
import * as stories from "../src/components/Filter/components/Filter/stories/filter.stories";
import { TEST_IDS } from "../src/tests/testIds";
import { getButton } from "../src/tests/utils";

const { RangeCategory } = composeStories(stories);

const TEST_VALUES = {
  ON_FILTER_BY_RANGE: RangeCategory.args.onFilter,
  RANGE_CATEGORY: RangeCategory.args.categoryView,
  RANGE_CATEGORY_KEY: RangeCategory.args.categoryView?.key,
};

/**
 * Tests for the Filter component.
 * TODO(cc) add tests:
 * - selected values (rending of tags) for select and range categories
 * - disabled state
 * - select category view
 */

describe("Filter", () => {
  describe("RANGE Category", () => {
    let buttonEl: HTMLButtonElement;

    beforeEach(() => {
      jest.clearAllMocks();
      render(<RangeCategory />);
      const expectedLabel = TEST_VALUES.RANGE_CATEGORY?.label;
      buttonEl = screen.getByRole("button", { name: expectedLabel });
    });

    it("renders filter label", () => {
      expect(buttonEl).toBeDefined();
    });

    it("opens popover when filter button is clicked", async () => {
      await openPopover(buttonEl);
    });

    it("calls onFilter with correct values", async () => {
      await openPopover(buttonEl);
      const popoverEl = getPopoverEl();
      const inputEl = within(popoverEl).getByLabelText("Min");
      await userEvent.type(inputEl, "100");
      await userEvent.click(getButton("Filter"));
      await waitFor(() => {
        expect(TEST_VALUES.ON_FILTER_BY_RANGE).toHaveBeenCalledTimes(1);
        expect(TEST_VALUES.ON_FILTER_BY_RANGE).toHaveBeenCalledWith(
          TEST_VALUES.RANGE_CATEGORY_KEY,
          [100, null],
          true,
          undefined,
          VIEW_KIND.RANGE
        );
      });
    });

    it("closes popover with keyboard escape", async () => {
      await openPopover(buttonEl);
      await closePopover();
    });
  });
});

/**
 * Retrieves the popover element.
 * @returns The popover element.
 */
function getPopoverEl(): HTMLElement {
  return screen.getByTestId(TEST_IDS.FILTER_POPOVER);
}

/**
 * Closes the popover with keyboard escape.
 * @returns A promise that resolves when the popover is closed.
 */
async function closePopover(): Promise<void> {
  await userEvent.keyboard("{Escape}");
  await waitFor(() => {
    expect(screen.queryByTestId(TEST_IDS.FILTER_POPOVER)).toBeNull();
  });
}

/**
 * Opens the popover by clicking the button.
 * @param buttonEl - The button element to click.
 * @returns A promise that resolves when the popover is opened.
 */
async function openPopover(buttonEl: HTMLButtonElement): Promise<void> {
  await userEvent.click(buttonEl);
  await waitFor(() => {
    expect(screen.getByTestId(TEST_IDS.FILTER_POPOVER)).toBeDefined();
  });
}

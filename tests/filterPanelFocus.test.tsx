import { Dialog, dialogClasses } from "@mui/material";
import { composeStories } from "@storybook/react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as stories from "../src/components/Filter/components/Filter/stories/filter.stories";
import { TEST_IDS } from "../src/tests/testIds";

const { RangeCategory, SelectCategory } = composeStories(stories);

const SELECT_LABEL = SelectCategory.args.categoryView?.label ?? "";
const RANGE_LABEL = RangeCategory.args.categoryView?.label ?? "";

describe("Filter panel focus", () => {
  it("moves focus to the first term when a short list panel, with no search box, opens by keyboard", async () => {
    render(<SelectCategory />);

    await openByKeyboard(SELECT_LABEL);

    await waitFor(() => expect(document.activeElement).toBe(getTerms()[0]));
  });

  it("makes each term a single tab stop", async () => {
    render(<SelectCategory />);
    await openByKeyboard(SELECT_LABEL);
    const [first, second] = getTerms();
    await waitFor(() => expect(document.activeElement).toBe(first));

    await userEvent.tab();

    expect(document.activeElement).toBe(second);
    expect(within(first).getByRole("checkbox").tabIndex).toBe(-1);
    // The tab stop carries the term's selected state, as its checkbox is out of the tab order.
    expect(first.getAttribute("aria-pressed")).toBe("false");
  });

  it("moves focus to the first control when a range panel opens by keyboard", async () => {
    render(<RangeCategory />);

    await openByKeyboard(RANGE_LABEL);

    // The range form's first control: its first operator toggle button.
    const [firstControl] = within(getPanel()).getAllByRole("button");
    await waitFor(() => expect(document.activeElement).toBe(firstControl));
  });

  it("returns focus to the button on Escape", async () => {
    render(<SelectCategory />);
    const button = await openByKeyboard(SELECT_LABEL);
    await waitFor(() => expect(document.activeElement).toBe(getTerms()[0]));

    await userEvent.keyboard("{Escape}");

    await waitForPanelClosed();
    expect(document.activeElement).toBe(button);
  });

  it("closes the panel and moves to what follows the button on Tab from its last control", async () => {
    render(
      <>
        <SelectCategory />
        <button>Next</button>
      </>,
    );
    await openByKeyboard(SELECT_LABEL);
    const terms = getTerms();
    terms[terms.length - 1].focus();

    await userEvent.tab();

    await waitForPanelClosed();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Next" }),
    );
  });

  it("skips a control hidden by CSS when moving to what follows the button", async () => {
    // jsdom has no layout, so it can't tell what CSS hides; stand in for the browser's checkVisibility.
    const descriptor = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "checkVisibility",
    );
    Object.defineProperty(HTMLElement.prototype, "checkVisibility", {
      configurable: true,
      value(this: HTMLElement): boolean {
        return this.style.display !== "none";
      },
    });
    try {
      render(
        <>
          <SelectCategory />
          <button style={{ display: "none" }}>Hidden</button>
          <button>Next</button>
        </>,
      );
      await openByKeyboard(SELECT_LABEL);
      const terms = getTerms();
      terms[terms.length - 1].focus();

      await userEvent.tab();

      await waitForPanelClosed();
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Next" }),
      );
    } finally {
      if (descriptor)
        Object.defineProperty(
          HTMLElement.prototype,
          "checkVisibility",
          descriptor,
        );
      else
        delete (HTMLElement.prototype as Partial<HTMLElement>).checkVisibility;
    }
  });

  it("closes the panel and returns to the button on Shift+Tab from its first control", async () => {
    render(<SelectCategory />);
    const button = await openByKeyboard(SELECT_LABEL);
    await waitFor(() => expect(document.activeElement).toBe(getTerms()[0]));

    await userEvent.tab({ shift: true });

    await waitForPanelClosed();
    expect(document.activeElement).toBe(button);
  });

  it("renders the panel inside a dialog, so the dialog's focus trap leaves focus in the panel", async () => {
    render(
      <Dialog open>
        <SelectCategory />
      </Dialog>,
    );

    await openByKeyboard(SELECT_LABEL);

    const dialogPaper = document.querySelector(`.${dialogClasses.paper}`);
    expect(dialogPaper?.contains(getPanel())).toBe(true);
    await waitFor(() => expect(document.activeElement).toBe(getTerms()[0]));
  });
});

/**
 * Returns the open filter panel.
 * @returns The panel.
 */
function getPanel(): HTMLElement {
  return screen.getByTestId(TEST_IDS.FILTER_POPOVER);
}

/**
 * Returns the open list panel's terms.
 * @returns The terms.
 */
function getTerms(): HTMLElement[] {
  return within(getPanel()).getAllByTestId(TEST_IDS.FILTER_ITEM);
}

/**
 * Focuses the filter's button and opens its panel with Enter.
 * @param label - Filter label; the button's name starts with it, and may add a value count.
 * @returns The filter's button.
 */
async function openByKeyboard(label: string): Promise<HTMLElement> {
  const button = screen.getByRole("button", {
    name: (name) => name.startsWith(label),
  });
  button.focus();
  await userEvent.keyboard("{Enter}");
  await screen.findByTestId(TEST_IDS.FILTER_POPOVER);
  return button;
}

/**
 * Waits for the filter panel to close.
 */
async function waitForPanelClosed(): Promise<void> {
  await waitFor(() =>
    expect(screen.queryByTestId(TEST_IDS.FILTER_POPOVER)).toBeNull(),
  );
}

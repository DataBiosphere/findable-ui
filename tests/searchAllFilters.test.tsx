import { jest } from "@jest/globals";
import {
  listItemButtonClasses,
  Dialog as MDialog,
  Popover,
} from "@mui/material";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { JSX, ReactNode } from "react";
import { VariableSizeList as ReactWindowList } from "react-window";
import { VIEW_KIND } from "../src/common/categories/views/types";
import {
  BIOLOGICAL_SEX,
  GENUS_SPECIES,
} from "../src/components/Filter/components/Filters/stories/constants";
import { SearchAllFilters } from "../src/components/Filter/components/SearchAllFilters/searchAllFilters";
import { SURFACE_TYPE } from "../src/components/Filter/components/surfaces/types";
import { OnFilterFn } from "../src/hooks/useCategoryFilter";

const CATEGORY_VIEWS = [BIOLOGICAL_SEX, GENUS_SPECIES];

describe("SearchAllFilters keyboard", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("highlights values with ArrowDown and ArrowUp, skipping headers and wrapping", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.click(input);
    const options = await screen.findAllByRole("option");
    // Male, Female, Homo sapiens, Mus musculus.
    expect(options).toHaveLength(4);

    await user.keyboard("{ArrowDown}");
    expect(getActiveDescendant()).toBe(options[0]);
    // The focus style is the only visible sign of the highlight.
    expect(
      options[0].classList.contains(listItemButtonClasses.focusVisible),
    ).toBe(true);

    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(getActiveDescendant()).toBe(options[2]);
    expect(
      options[0].classList.contains(listItemButtonClasses.focusVisible),
    ).toBe(false);

    await user.keyboard("{ArrowUp}");
    expect(getActiveDescendant()).toBe(options[1]);

    await user.keyboard("{ArrowUp}{ArrowUp}");
    expect(getActiveDescendant()).toBe(options[3]);
    expect(document.activeElement).toBe(input);
  });

  it("keeps the highlight on PageDown and PageUp", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();

    await user.click(getInput());
    const options = await screen.findAllByRole("option");
    await user.keyboard("{ArrowDown}{PageDown}{PageUp}");

    expect(getActiveDescendant()).toBe(options[0]);
  });

  it("names each term with its category in a multiselectable listbox, and hides the category headers and dividers from screen readers", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();

    await user.click(getInput());

    expect(
      await screen.findByRole("option", { name: /^Female ?, Biological Sex/ }),
    ).toBeTruthy();
    expect(
      screen.getByRole("listbox").getAttribute("aria-multiselectable"),
    ).toBe("true");
    expect(
      screen.getByText("Genus Species").closest("[aria-hidden='true']"),
    ).not.toBeNull();
    expect(
      screen
        .getByRole("separator", { hidden: true })
        .closest("[aria-hidden='true']"),
    ).not.toBeNull();
  });

  it("scrolls the highlighted term into view", async () => {
    const user = userEvent.setup();
    const scrollToItem = jest.spyOn(ReactWindowList.prototype, "scrollToItem");
    renderSearchAllFilters();

    await user.click(getInput());
    await screen.findAllByRole("option");
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");

    // Biological Sex, Male, Female, divider, Genus Species, Homo sapiens.
    expect(scrollToItem).toHaveBeenLastCalledWith(5);
  });

  it("clears the highlight when the list closes", async () => {
    const user = userEvent.setup();
    const onFilter = jest.fn<OnFilterFn>();
    renderSearchAllFilters(onFilter);
    const input = getInput();

    await user.click(input);
    await screen.findAllByRole("option");
    await user.keyboard("{ArrowDown}");
    await user.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() =>
      expect(screen.queryAllByRole("option")).toHaveLength(0),
    );

    await user.click(input);
    await screen.findAllByRole("option");
    expect(input.hasAttribute("aria-activedescendant")).toBe(false);
    await user.keyboard("{Enter}");
    expect(onFilter).not.toHaveBeenCalled();
  });

  it("points aria-activedescendant at nothing when the list opens with nothing highlighted", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.tab();
    await screen.findAllByRole("option");

    expect(input.hasAttribute("aria-activedescendant")).toBe(false);
  });

  it("leaves keys to an input method while it composes text", async () => {
    const user = userEvent.setup();
    const onFilter = jest.fn<OnFilterFn>();
    renderSearchAllFilters(onFilter);
    const input = getInput();

    await user.click(input);
    await screen.findAllByRole("option");
    fireEvent.keyDown(input, { isComposing: true, key: "ArrowDown" });
    expect(input.hasAttribute("aria-activedescendant")).toBe(false);

    await user.keyboard("{ArrowDown}");
    fireEvent.keyDown(input, { key: "Enter", keyCode: 229 });
    expect(onFilter).not.toHaveBeenCalled();
  });

  it("keeps focus on its term when the list changes around it", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <SearchAllFilters categoryViews={CATEGORY_VIEWS} onFilter={jest.fn()} />,
    );

    await user.type(getInput(), "m");
    await user.tab();
    await user.tab();
    await user.tab();
    expect(document.activeElement?.textContent).toMatch(/^Homo sapiens/);

    // Male drops out, as when a selection leaves it with no count.
    rerender(
      <SearchAllFilters
        categoryViews={[
          {
            ...BIOLOGICAL_SEX,
            values: BIOLOGICAL_SEX.values.filter(({ key }) => key !== "male"),
          },
          GENUS_SPECIES,
        ]}
        onFilter={jest.fn()}
      />,
    );

    expect(document.activeElement?.textContent).toMatch(/^Homo sapiens/);
  });

  it("applies the highlighted term with Enter", async () => {
    const user = userEvent.setup();
    const onFilter = jest.fn<OnFilterFn>();
    renderSearchAllFilters(onFilter);

    await user.type(getInput(), "fem");
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onFilter).toHaveBeenCalledTimes(1);
    expect(onFilter).toHaveBeenCalledWith(
      "biologicalSex",
      "female",
      true,
      undefined,
      VIEW_KIND.SELECT,
      "fem",
    );
    expect(screen.getAllByRole("option")).toHaveLength(1);
  });

  it("clears the highlight when the search changes", async () => {
    const user = userEvent.setup();
    const onFilter = jest.fn<OnFilterFn>();
    renderSearchAllFilters(onFilter);
    const input = getInput();

    await user.type(input, "m");
    await user.keyboard("{ArrowDown}");
    expect(input.getAttribute("aria-activedescendant")).toBeTruthy();

    // "ma" still lists Male, the highlighted term, so Enter would apply it if the highlight survived.
    await user.type(input, "a");
    expect(input.hasAttribute("aria-activedescendant")).toBe(false);
    await user.keyboard("{Enter}");
    expect(onFilter).not.toHaveBeenCalled();
  });

  it("opens the list when the input takes focus", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();

    await user.tab();

    expect(document.activeElement).toBe(getInput());
    expect(await screen.findAllByRole("option")).toHaveLength(4);
  });

  it("moves Tab from the input through the terms and on to the next control, clearing the search", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "m");
    const options = screen.getAllByRole("option");
    // Male, Female, Homo sapiens, Mus musculus.
    expect(options).toHaveLength(4);

    await user.tab();
    expect(document.activeElement).toBe(options[0]);

    await user.tab();
    await user.tab();
    await user.tab();
    expect(document.activeElement).toBe(options[3]);

    await user.tab();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Next" }),
    );
    expect(input).toHaveProperty("value", "");
    await waitFor(() =>
      expect(screen.queryAllByRole("option")).toHaveLength(0),
    );
  });

  it("moves Tab from the input to the highlighted term, clearing the highlight", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.click(input);
    const options = await screen.findAllByRole("option");
    await user.keyboard("{ArrowDown}{ArrowDown}");
    await user.tab();

    expect(document.activeElement).toBe(options[1]);
    expect(input.hasAttribute("aria-activedescendant")).toBe(false);
  });

  it("returns Shift+Tab from the first term to the input, leaving the list open", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "m");
    await user.tab();
    await user.tab({ shift: true });

    expect(document.activeElement).toBe(input);
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("moves Shift+Tab from the input with text to the previous control", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Previous</button>
        <SearchAllFilters
          categoryViews={CATEGORY_VIEWS}
          onFilter={jest.fn<OnFilterFn>()}
        />
      </>,
    );

    await user.type(getInput(), "fem");
    await user.tab({ shift: true });

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Previous" }),
    );
  });

  it("moves ArrowDown and ArrowUp through the terms, stopping at the last and returning from the first to the input", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "m");
    const options = screen.getAllByRole("option");
    await user.tab();

    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(document.activeElement).toBe(options[2]);

    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(document.activeElement).toBe(options[3]);

    await user.keyboard("{ArrowUp}{ArrowUp}{ArrowUp}");
    expect(document.activeElement).toBe(options[0]);

    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(input);
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("returns Escape from a term to the input, closing the list and clearing the search", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "fem");
    await user.tab();
    await user.keyboard("{Escape}");

    expect(document.activeElement).toBe(input);
    expect(input).toHaveProperty("value", "");
    await waitFor(() =>
      expect(screen.queryAllByRole("option")).toHaveLength(0),
    );
  });

  it("applies a focused term with Enter", async () => {
    const user = userEvent.setup();
    const onFilter = jest.fn<OnFilterFn>();
    renderSearchAllFilters(onFilter);

    await user.type(getInput(), "fem");
    await user.tab();
    await user.keyboard("{Enter}");

    expect(onFilter).toHaveBeenCalledWith(
      "biologicalSex",
      "female",
      true,
      undefined,
      VIEW_KIND.SELECT,
      "fem",
    );
    expect(document.activeElement).toBe(screen.getByRole("option"));
  });

  it("moves Tab on to the next control when nothing is typed or highlighted", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();

    await user.tab();
    expect(await screen.findAllByRole("option")).toHaveLength(4);
    await user.tab();

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Next" }),
    );
    await waitFor(() =>
      expect(screen.queryAllByRole("option")).toHaveLength(0),
    );
  });

  it("clears the search when a click moves focus away from the input", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "fem");
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(input).toHaveProperty("value", "");
    await waitFor(() =>
      expect(screen.queryAllByRole("option")).toHaveLength(0),
    );
  });

  it("moves Tab on to the next control when nothing matches, clearing the search", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "zzz");
    const clear = screen.getByRole("button", { name: "Clear search" });
    expect(clear.tabIndex).toBe(-1);

    await user.tab();

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Next" }),
    );
    expect(input).toHaveProperty("value", "");
  });

  it("closes the list, clearing the search, when focus leaves a term", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "fem");
    await user.tab();
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(input).toHaveProperty("value", "");
    await waitFor(() =>
      expect(screen.queryAllByRole("option")).toHaveLength(0),
    );
  });

  it.each([
    ["a dialog", Dialog, SURFACE_TYPE.POPPER_MENU, true],
    // The narrow-width Filters popover, which renders the search as a popper drawer.
    ["a popover", PopoverSurface, SURFACE_TYPE.POPPER_DRAWER, false],
  ])(
    "keeps Tab in the list within %s",
    async (_, Surface, surfaceType, inSurface) => {
      const user = userEvent.setup();
      render(
        <Surface>
          <SearchAllFilters
            categoryViews={CATEGORY_VIEWS}
            onFilter={jest.fn()}
            surfaceType={surfaceType}
          />
          <button>Next</button>
        </Surface>,
      );
      const input = getInput();

      await user.type(input, "fem");
      // jsdom doesn't run MUI's focus traps, so where the list renders is checked directly: inside a dialog, whose trap pulled focus out of filter panels portaled to the body (#1205); portaled to the body from the narrow-width popover, also a MUI modal, whose trap lets focus stay on a portaled React child.
      const surfacePaper = input.closest(".MuiPaper-root");
      expect(surfacePaper?.contains(screen.getByRole("listbox"))).toBe(
        inSurface,
      );
      await user.tab();
      expect(document.activeElement).toBe(screen.getByRole("option"));

      await user.tab();
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Next" }),
      );
      expect(input).toHaveProperty("value", "");
    },
  );

  it("closes only the list on Escape from a term within a dialog", async () => {
    const user = userEvent.setup();
    const onDialogClose = jest.fn();
    render(
      <MDialog onClose={onDialogClose} open>
        <SearchAllFilters categoryViews={CATEGORY_VIEWS} onFilter={jest.fn()} />
      </MDialog>,
    );
    const input = getInput();

    await user.type(input, "fem");
    await user.tab();
    await user.keyboard("{Escape}");

    expect(onDialogClose).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(input);
    await waitFor(() =>
      expect(screen.queryAllByRole("option")).toHaveLength(0),
    );
  });

  it("clears the search and keeps focus in the input on Escape", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "fem");
    await user.keyboard("{Escape}");
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(input).toHaveProperty("value", "");
    expect(document.activeElement).toBe(input);
  });

  it("reopens the list with ArrowDown after Escape closes it", async () => {
    const user = userEvent.setup();
    renderSearchAllFilters();
    const input = getInput();

    await user.type(input, "fem");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryAllByRole("option")).toHaveLength(0),
    );
    expect(document.activeElement).toBe(input);

    await user.keyboard("{ArrowDown}");

    expect(await screen.findAllByRole("option")).toHaveLength(4);
  });

  it("does nothing on Enter with no term highlighted", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onFilter = jest.fn<OnFilterFn>();
    renderSearchAllFilters(onFilter);
    const input = getInput();

    // With text in the input, Mui's own Enter handling would close the list and clear the search.
    await user.type(input, "fem");
    await user.keyboard("{Enter}");
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onFilter).not.toHaveBeenCalled();
    expect(input).toHaveProperty("value", "fem");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(document.activeElement).toBe(input);
  });

  it("applies a term clicked with the mouse", async () => {
    const user = userEvent.setup();
    const onFilter = jest.fn<OnFilterFn>();
    renderSearchAllFilters(onFilter);

    await user.type(getInput(), "fem");
    await user.click(screen.getByRole("option"));

    expect(onFilter).toHaveBeenCalledWith(
      "biologicalSex",
      "female",
      true,
      undefined,
      VIEW_KIND.SELECT,
      "fem",
    );
  });
});

/**
 * Returns the element the search input's aria-activedescendant points at.
 * @returns The highlighted option, or null.
 */
function getActiveDescendant(): HTMLElement | null {
  const id = getInput().getAttribute("aria-activedescendant");
  return id ? document.getElementById(id) : null;
}

/**
 * Returns the search input.
 * @returns The search input.
 */
function getInput(): HTMLInputElement {
  return screen.getByRole<HTMLInputElement>("combobox");
}

/**
 * Renders search all filters followed by a button, the next control in the tab order.
 * @param onFilter - Function invoked when a value is toggled.
 */
function renderSearchAllFilters(
  onFilter: OnFilterFn = jest.fn<OnFilterFn>(),
): void {
  render(
    <>
      <SearchAllFilters categoryViews={CATEGORY_VIEWS} onFilter={onFilter} />
      <button>Next</button>
    </>,
  );
}

/**
 * Renders the children in an open MUI dialog, whose focus trap holds focus in it.
 * @param props - Component props.
 * @param props.children - Dialog content.
 * @returns The dialog.
 */
function Dialog({ children }: { children: ReactNode }): JSX.Element {
  return <MDialog open>{children}</MDialog>;
}

/**
 * Renders the children in an open MUI popover, as the narrow-width sidebar drawer does; its focus trap holds focus in it.
 * @param props - Component props.
 * @param props.children - Popover content.
 * @returns The popover.
 */
function PopoverSurface({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Popover
      anchorPosition={{ left: 0, top: 0 }}
      anchorReference="anchorPosition"
      open
    >
      {children}
    </Popover>
  );
}

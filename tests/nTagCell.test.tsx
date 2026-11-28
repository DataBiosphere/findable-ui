import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NTagCell } from "../src/components/Table/components/TableCell/components/NTagCell/nTagCell";
import { createAppTheme } from "../src/theme/theme";

const MUI_CHIP_ROOT = ".MuiChip-root";

const NEXT_BUTTON_NAME = "Next";

const THEME = createAppTheme();

/**
 * Renders an NTagCell with the given values, followed by a button for focus to move on to.
 * @param values - Metadata values.
 * @returns The render result's container.
 */
function renderNTagCell(values: string[]): HTMLElement {
  return render(
    <ThemeProvider theme={THEME}>
      <NTagCell label="species" values={values} />
      <button>{NEXT_BUTTON_NAME}</button>
    </ThemeProvider>,
  ).container;
}

describe("NTagCell", () => {
  it("should render more than one value as an NTagChip", () => {
    const container = renderNTagCell(["a", "b"]);
    const chips = container.querySelectorAll(MUI_CHIP_ROOT);
    expect(chips).toHaveLength(1);
    expect(chips[0]).toHaveTextContent("2 species");
    expect(chips[0]).toHaveClass("MuiChip-filled");
    expect(chips[0]).not.toHaveClass("MuiChip-ntag");
  });

  it("should list the values in a tooltip on hover", async () => {
    renderNTagCell(["a", "b"]);
    fireEvent.mouseOver(screen.getByText("2 species"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("a, b");
  });

  it("should render a single value as text, with no tag and no tab stop", () => {
    const container = renderNTagCell(["a"]);
    expect(container.querySelector(MUI_CHIP_ROOT)).toBeNull();
    expect(container.querySelector("[tabindex]")).toBeNull();
    expect(screen.getByText("a")).toBeInTheDocument();
  });

  it("should keep the tag non-interactive, with no role", () => {
    const container = renderNTagCell(["a", "b"]);
    expect(container.querySelector(MUI_CHIP_ROOT)).not.toHaveAttribute("role");
  });

  describe("keyboard", () => {
    beforeEach(() => {
      // MUI opens a tooltip on keyboard focus only when its child matches `:focus-visible`, which jsdom doesn't
      // support, so it matches the focused element here.
      const matches = Element.prototype.matches;
      jest.spyOn(Element.prototype, "matches").mockImplementation(function (
        this: Element,
        selector: string,
      ): boolean {
        if (selector === ":focus-visible")
          return this === document.activeElement;
        return matches.call(this, selector);
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should open the tooltip on Tab, describing the tag with the values and keeping its label", async () => {
      const container = renderNTagCell(["a", "b"]);
      const tagEl = container.querySelector<HTMLElement>(MUI_CHIP_ROOT)!;

      await userEvent.tab();
      expect(tagEl).toHaveFocus();
      const tooltipEl = await screen.findByRole("tooltip");

      expect(tooltipEl).toHaveTextContent("a, b");
      expect(tagEl).toHaveAttribute("aria-describedby", tooltipEl.id);
      expect(tagEl).toHaveAccessibleDescription("a, b");
      // A role-less element has no computed accessible name, so check that nothing replaces its label text.
      expect(tagEl).not.toHaveAttribute("aria-label");
      expect(tagEl).not.toHaveAttribute("aria-labelledby");
      expect(tagEl).toHaveTextContent("2 species");
    });

    it("should close the tooltip on Escape, keeping focus on the tag", async () => {
      const container = renderNTagCell(["a", "b"]);
      const tagEl = container.querySelector<HTMLElement>(MUI_CHIP_ROOT)!;

      await userEvent.tab();
      await screen.findByRole("tooltip");
      await userEvent.keyboard("{Escape}");

      await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
      expect(tagEl).toHaveFocus();
    });

    it("should close the tooltip when focus moves on", async () => {
      renderNTagCell(["a", "b"]);

      await userEvent.tab();
      await screen.findByRole("tooltip");
      await userEvent.tab();

      expect(
        screen.getByRole("button", { name: NEXT_BUTTON_NAME }),
      ).toHaveFocus();
      await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
    });
  });
});

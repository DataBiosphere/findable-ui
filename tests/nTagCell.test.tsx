import { ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { NTagCell } from "../src/components/Table/components/TableCell/components/NTagCell/nTagCell";
import { createAppTheme } from "../src/theme/theme";

const THEME = createAppTheme();

/**
 * Renders an NTagCell with the given values.
 * @param values - Metadata values.
 * @returns The render result's container.
 */
function renderNTagCell(values: string[]): HTMLElement {
  return render(
    <ThemeProvider theme={THEME}>
      <NTagCell label="species" values={values} />
    </ThemeProvider>,
  ).container;
}

describe("NTagCell", () => {
  it("should render more than one value as an NTagChip", () => {
    const container = renderNTagCell(["a", "b"]);
    const chips = container.querySelectorAll(".MuiChip-root");
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

  it("should render a single value as text, with no tag", () => {
    const container = renderNTagCell(["a"]);
    expect(container.querySelector(".MuiChip-root")).toBeNull();
    expect(screen.getByText("a")).toBeInTheDocument();
  });
});

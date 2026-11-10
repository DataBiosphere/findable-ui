import { jest } from "@jest/globals";
import { chipClasses, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { createAppTheme } from "../src/theme/theme";

// The version chip reads the catalog from the site config.
jest.unstable_mockModule("../src/hooks/useCatalog", () => ({
  useCatalog: jest.fn(() => "test-catalog"),
}));

const { Footer } =
  await import("../src/components/Layout/components/Footer/footer");

const NAV_LINKS = [{ label: "Help", url: "/help" }];

/**
 * Renders the footer within the app theme, with a nav link so its links section shows, and returns its version chip.
 * The chip is found by its class, not its label, which depends on the build's version environment variables.
 * @param versionInfo - Version info prop.
 * @returns The version chip, or null when none renders.
 */
function renderFooterChip(versionInfo?: ReactNode): Element | null {
  const { container } = render(
    <ThemeProvider theme={createAppTheme()}>
      <Footer navLinks={NAV_LINKS} versionInfo={versionInfo} />
    </ThemeProvider>,
  );
  return container.querySelector(`.${chipClasses.root}`);
}

describe("Footer versionInfo", () => {
  it("renders the default version chip for true", () => {
    expect(renderFooterChip(true)).not.toBeNull();
  });

  it.each([false, undefined])(
    "renders no version chip for %p",
    (versionInfo) => {
      expect(renderFooterChip(versionInfo)).toBeNull();
      // The nav link shows the links section rendered, so the chip is absent rather than the section.
      expect(screen.getByText("Help")).not.toBeNull();
    },
  );

  it("renders a node in place of the default chip", () => {
    expect(renderFooterChip(<span>Custom version</span>)).toBeNull();
    expect(screen.getByText("Custom version")).not.toBeNull();
  });
});

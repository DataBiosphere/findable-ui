import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { JSX, ReactElement } from "react";
import { createAppTheme } from "../src/theme/theme";

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ basePath: "/base" })),
}));

const { LightboxFigure } =
  await import("../src/components/common/FigureLightbox/components/LightboxFigure/lightboxFigure");
const { FigureLightboxProvider } =
  await import("../src/components/common/FigureLightbox/provider/provider");
const { formatZoom, getCounterLabel, isVectorImage, resolveFigureSrc } =
  await import("../src/components/common/FigureLightbox/utils");

const FIGURE_A = { alt: "Figure A", caption: "Caption A", src: "/a.svg" };
const FIGURE_B = { alt: "Figure B", caption: "Caption B", src: "/b.svg" };
const FIGURE_C = { alt: "Figure C", caption: "Caption C", src: "/c.svg" };

/**
 * Renders the given figures in a FigureLightboxProvider.
 * @param props - Component props.
 * @param props.figures - Figures to render, in page order.
 * @returns The provider with the figures.
 */
function Group({ figures }: { figures: (typeof FIGURE_A)[] }): JSX.Element {
  return (
    <FigureLightboxProvider>
      {figures.map((figure) => (
        <LightboxFigure key={figure.alt} {...figure} />
      ))}
    </FigureLightboxProvider>
  );
}

/**
 * Renders the given element in the app theme.
 * @param ui - Element to render.
 * @returns The render result, with a rerender that keeps the theme.
 */
function renderWithTheme(ui: ReactElement): {
  container: HTMLElement;
  rerender: (ui: ReactElement) => void;
} {
  const theme = createAppTheme();
  const { container, rerender } = render(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>,
  );
  return {
    container,
    rerender: (ui: ReactElement): void =>
      rerender(<ThemeProvider theme={theme}>{ui}</ThemeProvider>),
  };
}

/**
 * Opens the lightbox by clicking the expand button of the figure with the given alt text.
 * @param alt - Figure alt text.
 * @returns The lightbox dialog.
 */
async function openFigure(alt: string): Promise<HTMLElement> {
  fireEvent.click(
    screen.getByRole("button", { name: `Expand figure: ${alt}` }),
  );
  return screen.findByRole("dialog", { name: alt });
}

describe("LightboxFigure", () => {
  it("renders the image as an expand button, with the caption in a figcaption", () => {
    const { container } = renderWithTheme(<LightboxFigure {...FIGURE_A} />);
    const button = screen.getByRole("button", {
      name: "Expand figure: Figure A",
    });
    expect(button.getAttribute("aria-haspopup")).toBe("dialog");
    expect(within(button).getByRole("img").getAttribute("src")).toBe(
      "/base/a.svg",
    );
    expect(container.querySelector("figure figcaption")?.textContent).toBe(
      "Caption A",
    );
  });

  it("opens a lightbox of its own outside a provider, without a counter or previous and next", async () => {
    renderWithTheme(<LightboxFigure {...FIGURE_A} />);
    const dialog = await openFigure(FIGURE_A.alt);
    expect(within(dialog).getByText("Caption A")).toBeTruthy();
    expect(
      within(dialog).getByRole("button", { name: "Show in context" }),
    ).toBeTruthy();
    expect(within(dialog).queryByText(/^Figure \d+ of \d+$/)).toBeNull();
    expect(
      within(dialog).queryByRole("button", { name: "Previous figure" }),
    ).toBeNull();
    expect(
      within(dialog).queryByRole("button", { name: "Next figure" }),
    ).toBeNull();
  });

  it("closes on Escape and returns focus to the expand button", async () => {
    renderWithTheme(<LightboxFigure {...FIGURE_A} />);
    const button = screen.getByRole("button", {
      name: "Expand figure: Figure A",
    });
    button.focus();
    const dialog = await openFigure(FIGURE_A.alt);
    // The lightbox listens for keys on its container, which holds focus while it is open.
    fireEvent.keyDown(dialog.querySelector(".yarl__container") as HTMLElement, {
      key: "Escape",
    });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(document.activeElement).toBe(button);
  });

  it("closes from the close button", async () => {
    renderWithTheme(<LightboxFigure {...FIGURE_A} />);
    const dialog = await openFigure(FIGURE_A.alt);
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("shows the zoom at 100% when fitted, with zoom out disabled", async () => {
    renderWithTheme(<LightboxFigure {...FIGURE_A} />);
    const dialog = await openFigure(FIGURE_A.alt);
    const zoom = within(dialog).getByRole("group", { name: "Zoom" });
    expect(within(zoom).getByText("100%")).toBeTruthy();
    // Only findable's zoom controls render, not the library's own.
    expect(
      within(dialog).getAllByRole("button", { name: "Zoom in" }),
    ).toHaveLength(1);
    expect(
      (
        within(zoom).getByRole("button", {
          name: "Zoom out",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(
      within(dialog).getByRole("button", { name: "Fit to screen" }),
    ).toBeTruthy();
  });

  it("links View original and Download to the original file", async () => {
    renderWithTheme(
      <LightboxFigure {...FIGURE_A} originalSrc="/a-original.svg" />,
    );
    const dialog = await openFigure(FIGURE_A.alt);
    fireEvent.click(
      within(dialog).getByRole("button", { name: "More actions" }),
    );
    const viewOriginal = await screen.findByRole("menuitem", {
      name: "View original",
    });
    const download = screen.getByRole("menuitem", { name: "Download" });
    expect(viewOriginal.getAttribute("href")).toBe("/base/a-original.svg");
    expect(viewOriginal.getAttribute("target")).toBe("_blank");
    expect(download.getAttribute("href")).toBe("/base/a-original.svg");
    expect(download.hasAttribute("download")).toBe(true);
  });
});

describe("FigureLightboxProvider", () => {
  it("counts figures and steps between them, stopping at the ends", async () => {
    renderWithTheme(<Group figures={[FIGURE_A, FIGURE_B, FIGURE_C]} />);
    const dialog = await openFigure(FIGURE_B.alt);
    expect(within(dialog).getByText("Figure 2 of 3")).toBeTruthy();
    const previous = within(dialog).getByRole("button", {
      name: "Previous figure",
    }) as HTMLButtonElement;
    const next = within(dialog).getByRole("button", {
      name: "Next figure",
    }) as HTMLButtonElement;
    fireEvent.click(previous);
    await waitFor(() =>
      expect(within(dialog).getByText("Figure 1 of 3")).toBeTruthy(),
    );
    expect(previous.disabled).toBe(true);
    fireEvent.click(next);
    await waitFor(() =>
      expect(within(dialog).getByText("Figure 2 of 3")).toBeTruthy(),
    );
    fireEvent.click(next);
    await waitFor(() =>
      expect(within(dialog).getByText("Figure 3 of 3")).toBeTruthy(),
    );
    expect(next.disabled).toBe(true);
    expect(within(dialog).getByText("Caption C")).toBeTruthy();
  });

  it("shows the figure being viewed in context, not the one that opened the lightbox", async () => {
    // jsdom doesn't implement scrollIntoView.
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    renderWithTheme(<Group figures={[FIGURE_A, FIGURE_B, FIGURE_C]} />);
    const opener = screen.getByRole("button", {
      name: "Expand figure: Figure A",
    });
    opener.focus();
    const dialog = await openFigure(FIGURE_A.alt);
    const next = within(dialog).getByRole("button", { name: "Next figure" });
    fireEvent.click(next);
    fireEvent.click(next);
    await waitFor(() =>
      expect(within(dialog).getByText("Figure 3 of 3")).toBeTruthy(),
    );
    fireEvent.click(
      within(dialog).getByRole("button", { name: "Show in context" }),
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Expand figure: Figure C" }),
    );
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.contexts[0]).toBe(
      screen.getByRole("button", { name: "Expand figure: Figure C" })
        .parentElement,
    );
    // The page is interactive again once the lightbox has closed.
    expect(document.querySelector("[inert]")).toBeNull();
  });

  it("counts figures in page order, not mount order", async () => {
    const { rerender } = renderWithTheme(
      <Group figures={[FIGURE_A, FIGURE_C]} />,
    );
    // Figure B mounts last but sits between A and C on the page.
    rerender(<Group figures={[FIGURE_A, FIGURE_B, FIGURE_C]} />);
    const dialog = await openFigure(FIGURE_C.alt);
    expect(within(dialog).getByText("Figure 3 of 3")).toBeTruthy();
  });
});

describe("FigureLightbox utils", () => {
  it("formats the zoom level as a percentage of fit", () => {
    expect(formatZoom(1)).toBe("100%");
    expect(formatZoom(2.345)).toBe("235%");
  });

  it("builds the counter label from a zero-based index", () => {
    expect(getCounterLabel(1, 11)).toBe("Figure 2 of 11");
  });

  it("prefixes root-relative figure URLs with the base path, and leaves absolute and data URLs as is", () => {
    expect(resolveFigureSrc("/base", "/figure.svg")).toBe("/base/figure.svg");
    expect(resolveFigureSrc("/base", "https://cdn.example.org/fig.pdf")).toBe(
      "https://cdn.example.org/fig.pdf",
    );
    expect(resolveFigureSrc("/base", "//cdn.example.org/fig.svg")).toBe(
      "//cdn.example.org/fig.svg",
    );
    expect(resolveFigureSrc("/base", "data:image/svg+xml,%3Csvg%3E")).toBe(
      "data:image/svg+xml,%3Csvg%3E",
    );
  });

  it("recognises SVG images by extension or data URL type", () => {
    expect(isVectorImage("/learn/blog/post/figure.svg")).toBe(true);
    expect(isVectorImage("/figure.SVG?v=1")).toBe(true);
    expect(isVectorImage("data:image/svg+xml,%3Csvg%3E")).toBe(true);
    expect(isVectorImage("/figure.png")).toBe(false);
    expect(isVectorImage("data:image/png;base64,AAAA")).toBe(false);
  });
});

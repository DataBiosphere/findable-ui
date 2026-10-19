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

// Router events, so tests can simulate client-side navigation.
type RouteChangeStartHandler = (
  url: string,
  options?: { shallow?: boolean },
) => void;
const routeChangeStartHandlers = new Set<RouteChangeStartHandler>();
const ROUTER_EVENTS = {
  emit: (options?: { shallow?: boolean }): void =>
    routeChangeStartHandlers.forEach((handler) => handler("/next", options)),
  off: (_event: string, handler: RouteChangeStartHandler): void => {
    routeChangeStartHandlers.delete(handler);
  },
  on: (_event: string, handler: RouteChangeStartHandler): void => {
    routeChangeStartHandlers.add(handler);
  },
};

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ basePath: "/base", events: ROUTER_EVENTS })),
}));

const { LightboxFigure } =
  await import("../src/components/common/FigureLightbox/components/LightboxFigure/lightboxFigure");
const { FigureLightboxProvider } =
  await import("../src/components/common/FigureLightbox/provider/provider");
const { MoreMenu } =
  await import("../src/components/common/FigureLightbox/components/MoreMenu/moreMenu");
const { showFigure } =
  await import("../src/components/common/FigureLightbox/hooks/UseShowInContext/utils");
const {
  buildSlide,
  formatZoom,
  getCounterLabel,
  isCrossOrigin,
  isVectorImage,
  resolveFigureSrc,
} = await import("../src/components/common/FigureLightbox/utils");

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
    // A same-origin file downloads in place, without opening a tab.
    expect(download.getAttribute("target")).toBeNull();
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

  it("keeps focus in the lightbox when Previous is disabled on reaching the first figure", async () => {
    renderWithTheme(<Group figures={[FIGURE_A, FIGURE_B, FIGURE_C]} />);
    const dialog = await openFigure(FIGURE_B.alt);
    const previous = within(dialog).getByRole("button", {
      name: "Previous figure",
    }) as HTMLButtonElement;
    previous.focus();
    fireEvent.click(previous);
    await waitFor(() =>
      expect(within(dialog).getByText("Figure 1 of 3")).toBeTruthy(),
    );
    expect(previous.disabled).toBe(true);
    await waitFor(() => expect(document.activeElement).not.toBe(previous));
    expect(dialog.contains(document.activeElement)).toBe(true);
    // Esc still reaches the lightbox.
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("stays open on a shallow URL update on the same page", async () => {
    renderWithTheme(<Group figures={[FIGURE_A, FIGURE_B]} />);
    await openFigure(FIGURE_A.alt);
    ROUTER_EVENTS.emit({ shallow: true });
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("closes on client-side navigation, leaving the page interactive", async () => {
    renderWithTheme(<Group figures={[FIGURE_A, FIGURE_B]} />);
    await openFigure(FIGURE_A.alt);
    ROUTER_EVENTS.emit();
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(document.querySelector("[inert]")).toBeNull();
  });

  it("counts figures in page order after figures on the page are reordered", async () => {
    const { rerender } = renderWithTheme(
      <Group figures={[FIGURE_A, FIGURE_B, FIGURE_C]} />,
    );
    // The same figures, moved on the page without remounting or changing props.
    rerender(<Group figures={[FIGURE_C, FIGURE_A, FIGURE_B]} />);
    const dialog = await openFigure(FIGURE_C.alt);
    expect(within(dialog).getByText("Figure 1 of 3")).toBeTruthy();
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

describe("FigureLightbox slides", () => {
  it("sizes an SVG slide from the lightbox's own image when the inline image hasn't given a size", async () => {
    renderWithTheme(<LightboxFigure {...FIGURE_A} />);
    const dialog = await openFigure(FIGURE_A.alt);
    // No size yet: VectorSlide shows the image at its natural size. The library's
    // own slide isn't used, as the zoom plugin would keep the size it measures.
    const unsized = dialog.querySelector(
      ".yarl__slide_current img",
    ) as HTMLImageElement;
    expect(unsized.classList.contains("yarl__slide_image")).toBe(false);
    expect(unsized.style.maxWidth).toBe("100%");
    Object.defineProperty(unsized, "naturalWidth", { value: 1120 });
    Object.defineProperty(unsized, "naturalHeight", { value: 328 });
    fireEvent.load(unsized);
    // Measured: the slide is rebuilt with the size, so VectorSlide sizes it to fit.
    await waitFor(() => {
      const sized = dialog.querySelector(
        ".yarl__slide_current img",
      ) as HTMLImageElement;
      expect(sized.style.maxWidth).toBe("");
      expect(sized.style.width).not.toBe("");
    });
  });
});

describe("Lightbox caption", () => {
  const LONG_CAPTION = "A long caption that runs past the three-line clamp.";

  /**
   * Makes elements report the given scroll and client heights, as jsdom has no layout.
   * @param scrollHeight - Content height.
   * @param clientHeight - Visible height.
   * @returns Restores the original properties.
   */
  function mockHeights(scrollHeight: number, clientHeight: number): () => void {
    const proto = HTMLElement.prototype;
    const scroll = Object.getOwnPropertyDescriptor(proto, "scrollHeight");
    const client = Object.getOwnPropertyDescriptor(proto, "clientHeight");
    Object.defineProperty(proto, "scrollHeight", {
      configurable: true,
      get: () => scrollHeight,
    });
    Object.defineProperty(proto, "clientHeight", {
      configurable: true,
      get: () => clientHeight,
    });
    // The real properties are inherited from Element.prototype, so there is
    // usually no own descriptor to put back: delete the overrides instead.
    return (): void => {
      if (scroll) Object.defineProperty(proto, "scrollHeight", scroll);
      else Reflect.deleteProperty(proto, "scrollHeight");
      if (client) Object.defineProperty(proto, "clientHeight", client);
      else Reflect.deleteProperty(proto, "clientHeight");
    };
  }

  it("shows a truncated caption in full in a tooltip, and makes it focusable", async () => {
    const restore = mockHeights(200, 72);
    try {
      renderWithTheme(<LightboxFigure {...FIGURE_A} caption={LONG_CAPTION} />);
      const dialog = await openFigure(FIGURE_A.alt);
      const caption = within(dialog).getByText(LONG_CAPTION);
      await waitFor(() => expect(caption.getAttribute("tabindex")).toBe("0"));
      // MUI opens a tooltip on keyboard focus (focus-visible), which jsdom can't
      // simulate, so hover opens it here.
      fireEvent.mouseOver(caption);
      const tooltip = await screen.findByRole("tooltip");
      expect(tooltip.textContent).toBe(LONG_CAPTION);
      // "Show in context" stays outside the clamped caption.
      expect(
        within(dialog).getByRole("button", { name: "Show in context" }),
      ).toBeTruthy();
      expect(caption.textContent).toBe(LONG_CAPTION);
    } finally {
      restore();
    }
  });

  it("restores the real element heights after mocking them", () => {
    const element = document.createElement("div");
    const restore = mockHeights(200, 72);
    expect(element.scrollHeight).toBe(200);
    restore();
    // jsdom has no layout, so the real heights are 0.
    expect(element.scrollHeight).toBe(0);
    expect(element.clientHeight).toBe(0);
    expect(Object.hasOwn(HTMLElement.prototype, "scrollHeight")).toBe(false);
  });

  it("gives a caption that fits no tooltip and no tab stop", async () => {
    const restore = mockHeights(48, 72);
    try {
      renderWithTheme(<LightboxFigure {...FIGURE_A} />);
      const dialog = await openFigure(FIGURE_A.alt);
      const caption = within(dialog).getByText("Caption A");
      expect(caption.hasAttribute("tabindex")).toBe(false);
      fireEvent.mouseOver(caption);
      await new Promise((resolve) => setTimeout(resolve, 200));
      expect(screen.queryByRole("tooltip")).toBeNull();
    } finally {
      restore();
    }
  });
});

describe("MoreMenu", () => {
  it("offers zoom in, zoom out and fit when the zoom group is hidden", async () => {
    const onFit = jest.fn();
    const onZoomIn = jest.fn();
    renderWithTheme(
      <MoreMenu
        onFit={onFit}
        onZoomIn={onZoomIn}
        onZoomOut={jest.fn()}
        originalSrc="/a.svg"
        showZoomActions
        zoom={1}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    expect(
      (await screen.findByRole("menuitem", { name: "Zoom out" })).getAttribute(
        "aria-disabled",
      ),
    ).toBe("true");
    fireEvent.click(screen.getByRole("menuitem", { name: "Zoom in" }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    fireEvent.click(
      await screen.findByRole("menuitem", { name: "Fit to screen" }),
    );
    expect(onFit).toHaveBeenCalledTimes(1);
  });

  it("offers no zoom actions when the zoom group is shown", async () => {
    renderWithTheme(
      <MoreMenu
        onFit={jest.fn()}
        onZoomIn={jest.fn()}
        onZoomOut={jest.fn()}
        originalSrc="/a.svg"
        showZoomActions={false}
        zoom={1}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    await screen.findByRole("menuitem", { name: "View original" });
    expect(screen.queryByRole("menuitem", { name: "Zoom in" })).toBeNull();
  });
});

describe("showFigure", () => {
  it("centres a figure, or aligns a figure taller than the viewport to its top", () => {
    const figureEl = document.createElement("figure");
    const scrollIntoView = jest.fn();
    figureEl.scrollIntoView = scrollIntoView;
    const figure = {
      alt: "",
      figureRef: { current: figureEl },
      id: "a",
      originalSrc: "",
      src: "",
    };
    const setHeight = (height: number): void => {
      figureEl.getBoundingClientRect = (): DOMRect => ({ height }) as DOMRect;
    };
    setHeight(window.innerHeight - 1);
    showFigure(figure);
    expect(scrollIntoView).toHaveBeenLastCalledWith({ block: "center" });
    setHeight(window.innerHeight + 1);
    showFigure(figure);
    expect(scrollIntoView).toHaveBeenLastCalledWith({ block: "start" });
  });
});

describe("FigureLightbox utils", () => {
  it("sizes vector slides at 8x their natural size, with a minimum so small SVGs can still zoom", () => {
    const buildFigure = (
      src: string,
      width: number,
      height: number,
    ): Parameters<typeof buildSlide>[0] => {
      const figureEl = document.createElement("figure");
      const image = document.createElement("img");
      Object.defineProperty(image, "naturalWidth", { value: width });
      Object.defineProperty(image, "naturalHeight", { value: height });
      figureEl.append(image);
      return {
        alt: "",
        figureRef: { current: figureEl },
        id: src,
        originalSrc: src,
        src,
      };
    };
    // A typical figure: 8x its natural size.
    expect(buildSlide(buildFigure("/figure.svg", 1120, 328))).toMatchObject({
      height: 2624,
      width: 8960,
    });
    // A small SVG: scaled up so its longer side reaches 8192px, keeping its shape.
    expect(buildSlide(buildFigure("/icon.svg", 100, 50))).toMatchObject({
      height: 4096,
      width: 8192,
    });
    // A raster image keeps its natural size.
    expect(buildSlide(buildFigure("/photo.png", 100, 50))).toMatchObject({
      height: 50,
      width: 100,
    });
  });

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

  it("treats other-origin URLs as cross-origin, and same-origin, data and blob URLs as not", () => {
    expect(isCrossOrigin("https://cdn.example.org/fig.svg")).toBe(true);
    expect(isCrossOrigin("/base/fig.svg")).toBe(false);
    expect(isCrossOrigin(`${window.location.origin}/fig.svg`)).toBe(false);
    expect(isCrossOrigin("data:image/svg+xml,%3Csvg%3E")).toBe(false);
    expect(isCrossOrigin("blob:https://cdn.example.org/1")).toBe(false);
  });

  it("recognises SVG images by extension or data URL type", () => {
    expect(isVectorImage("/learn/blog/post/figure.svg")).toBe(true);
    expect(isVectorImage("/figure.SVG?v=1")).toBe(true);
    expect(isVectorImage("data:image/svg+xml,%3Csvg%3E")).toBe(true);
    expect(isVectorImage("/figure.png")).toBe(false);
    expect(isVectorImage("data:image/png;base64,AAAA")).toBe(false);
  });
});

import { jest } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { FilterTag } from "../src/components/Filter/components/FilterTag/filterTag";

const MUI_CHIP_LABEL = ".MuiChip-label";
const MUI_CHIP_ROOT = ".MuiChip-root";
const SHORT_LABEL = "short";
const LONG_LABEL = "this label is wide enough to overflow its container";

const observerCallbacks: ResizeObserverCallback[] = [];

beforeEach(() => {
  observerCallbacks.length = 0;
  global.ResizeObserver = jest.fn().mockImplementation((cb) => {
    observerCallbacks.push(cb as ResizeObserverCallback);
    return {
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    };
  }) as unknown as typeof ResizeObserver;
});

/**
 * Override an element's measured dimensions so the overflow check
 * (`offsetWidth < scrollWidth`) returns a deterministic result in jsdom.
 * @param el - Target element (the rendered `.MuiChip-label`).
 * @param offsetWidth - Visible content-box width.
 * @param scrollWidth - Intrinsic content width.
 */
function setDimensions(
  el: HTMLElement,
  offsetWidth: number,
  scrollWidth: number,
): void {
  Object.defineProperty(el, "offsetWidth", {
    configurable: true,
    value: offsetWidth,
  });
  Object.defineProperty(el, "scrollWidth", {
    configurable: true,
    value: scrollWidth,
  });
}

/**
 * Synchronously trigger every captured ResizeObserver callback inside an
 * `act` block so the resulting setState is flushed before the test reads
 * DOM state.
 */
function triggerResize(): void {
  act(() => {
    observerCallbacks.forEach((cb) =>
      cb([] as unknown as ResizeObserverEntry[], {} as ResizeObserver),
    );
  });
}

describe("FilterTag tooltip title", () => {
  it("suppresses the tooltip when the label fits", async () => {
    const { container } = render(
      <FilterTag label={SHORT_LABEL} onRemove={(): void => undefined} />,
    );
    const labelEl = container.querySelector<HTMLElement>(MUI_CHIP_LABEL);
    expect(labelEl).not.toBeNull();
    setDimensions(labelEl!, 100, 100); // offsetWidth === scrollWidth → no overflow
    triggerResize();

    fireEvent.mouseOver(container.querySelector(MUI_CHIP_ROOT)!);
    // MUI suppresses the tooltip popper entirely when `title` is null.
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("shows the label as the tooltip title when truncated", async () => {
    const { container } = render(
      <FilterTag label={LONG_LABEL} onRemove={(): void => undefined} />,
    );
    const labelEl = container.querySelector<HTMLElement>(MUI_CHIP_LABEL);
    expect(labelEl).not.toBeNull();
    setDimensions(labelEl!, 100, 200); // scrollWidth > offsetWidth → overflow
    triggerResize();

    fireEvent.mouseOver(container.querySelector(MUI_CHIP_ROOT)!);
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip.textContent).toContain(LONG_LABEL);
  });

  it("clears the tooltip title when the label later fits again", async () => {
    const { container } = render(
      <FilterTag label={LONG_LABEL} onRemove={(): void => undefined} />,
    );
    const labelEl = container.querySelector<HTMLElement>(MUI_CHIP_LABEL);
    expect(labelEl).not.toBeNull();
    // First measurement reports overflow.
    setDimensions(labelEl!, 100, 200);
    triggerResize();
    // Then container resizes such that the label now fits.
    setDimensions(labelEl!, 200, 200);
    triggerResize();

    fireEvent.mouseOver(container.querySelector(MUI_CHIP_ROOT)!);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });
});

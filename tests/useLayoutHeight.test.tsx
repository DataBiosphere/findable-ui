import { jest } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import type { JSX } from "react";
import { useLayoutHeight } from "../src/components/Layout/hooks/UseLayoutHeight/hook";
import { PROPERTY } from "../src/hooks/useHtmlStyle/constants";

const PROPERTY_NAME = PROPERTY.HEADER_HEIGHT;

let resize: ((entries: ResizeObserverEntry[]) => void) | undefined;
const originalResizeObserver = global.ResizeObserver;

/**
 * Returns the custom property's value on the HTML element.
 * @returns Property value, or an empty string when unset.
 */
function getValue(): string {
  return document.documentElement.style.getPropertyValue(PROPERTY_NAME);
}

/**
 * Renders an element measured by useLayoutHeight.
 * @returns Unmount function.
 */
function renderMeasured(): () => void {
  /**
   * Element whose height is written to the custom property.
   * @returns The measured element.
   */
  const Measured = (): JSX.Element => {
    const { isMeasured, ref } = useLayoutHeight<HTMLDivElement>(PROPERTY_NAME);
    return <div data-measured={isMeasured} data-testid="measured" ref={ref} />;
  };
  return render(<Measured />).unmount;
}

/**
 * Reports a new border box height to the observer.
 * @param blockSize - Height in pixels.
 */
function reportHeight(blockSize: number): void {
  act(() => {
    resize?.([
      { borderBoxSize: [{ blockSize, inlineSize: 0 }] },
    ] as unknown as ResizeObserverEntry[]);
  });
}

describe("useLayoutHeight", () => {
  beforeEach(() => {
    resize = undefined;
    global.ResizeObserver = jest.fn(
      (callback: (entries: ResizeObserverEntry[]) => void) => {
        resize = callback;
        return {
          disconnect: jest.fn(),
          observe: jest.fn(),
          unobserve: jest.fn(),
        };
      },
    ) as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    global.ResizeObserver = originalResizeObserver;
    document.documentElement.style.removeProperty(PROPERTY_NAME);
  });

  it("should leave the property unset until the element is measured", () => {
    renderMeasured();
    expect(getValue()).toBe("");
  });

  it("should set the measured height, and update it on resize", () => {
    renderMeasured();
    expect(screen.getByTestId("measured").dataset.measured).toBe("false");
    reportHeight(57);
    expect(getValue()).toBe("57px");
    expect(screen.getByTestId("measured").dataset.measured).toBe("true");
    reportHeight(105);
    expect(getValue()).toBe("105px");
  });

  // A measured height of 0 (e.g. an empty footer) must not fall back to the
  // CSS default, so it is written rather than treated as "not measured".
  it("should set a measured height of 0", () => {
    renderMeasured();
    reportHeight(0);
    expect(getValue()).toBe("0px");
  });

  // The measured element can be unmounted and rendered again while the hook
  // stays mounted, e.g. a table head copy around "No Results"; a changed key
  // restarts observing on the new element.
  it("should observe an element rendered again when the key changes", () => {
    /**
     * Element, rendered only when shown, whose height is written to the custom property.
     * @param props - Component props.
     * @param props.shown - Whether the measured element is rendered.
     * @returns The measured element, or nothing.
     */
    const Toggled = ({ shown }: { shown: boolean }): JSX.Element | null => {
      const { ref } = useLayoutHeight<HTMLDivElement>(PROPERTY_NAME, shown);
      return shown ? <div data-testid="measured" ref={ref} /> : null;
    };
    const { rerender } = render(<Toggled shown={false} />);
    expect(global.ResizeObserver).not.toHaveBeenCalled();
    rerender(<Toggled shown />);
    expect(global.ResizeObserver).toHaveBeenCalledTimes(1);
    reportHeight(68);
    expect(getValue()).toBe("68px");
  });

  it("should remove the property on unmount", () => {
    const unmount = renderMeasured();
    reportHeight(57);
    unmount();
    expect(getValue()).toBe("");
  });
});

import { jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import type { FocusEventHandler, JSX } from "react";
import { useKeepScrollOnFocus } from "../src/components/Table/components/TableFeatures/GlobalFilter/hooks/UseKeepScrollOnFocus/hook";
import {
  keepScroll,
  restoreScroll,
  trackScrollY,
} from "../src/components/Table/components/TableFeatures/GlobalFilter/hooks/UseKeepScrollOnFocus/utils";

const originalScrollTo = window.scrollTo;

/**
 * Creates an element whose top in the window is given by the function.
 * @param getTop - Returns the element's top, relative to the window.
 * @returns The element.
 */
function createElement(getTop: () => number): HTMLElement {
  const element = document.createElement("input");
  mockRect(element, getTop);
  return element;
}

/**
 * Creates an element at the given page offset, which scrolls with the page.
 * @param pageTop - Element's top, relative to the top of the page.
 * @returns The element.
 */
function createElementAt(pageTop: number): HTMLElement {
  return createElement(() => pageTop - window.scrollY);
}

/**
 * Creates an element pinned at the given offset in the window, as a sticky
 * element's is.
 * @param top - Element's top, relative to the window.
 * @returns The element.
 */
function createPinnedElement(top: number): HTMLElement {
  return createElement(() => top);
}

/**
 * Mocks the element's bounding rect, 40px tall.
 * @param element - Element to mock.
 * @param getTop - Returns the element's top, relative to the window.
 */
function mockRect(element: HTMLElement, getTop: () => number): void {
  element.getBoundingClientRect = (): DOMRect => {
    const top = getTop();
    return { bottom: top + 40, top } as DOMRect;
  };
}

/**
 * Scrolls the page as a browser would, firing a scroll event.
 * @param y - Scroll position.
 */
function scrollPage(y: number): void {
  setScrollY(y);
  window.dispatchEvent(new Event("scroll"));
}

/**
 * Sets the page scroll position without firing a scroll event.
 * @param y - Scroll position.
 */
function setScrollY(y: number): void {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: y,
    writable: true,
  });
}

describe("useKeepScrollOnFocus", () => {
  let scrollTo: jest.Mock<(options: ScrollToOptions) => void>;

  beforeEach(() => {
    jest.useFakeTimers();
    setScrollY(0);
    scrollTo = jest.fn((options: ScrollToOptions) =>
      setScrollY(options.top ?? 0),
    );
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
    // The dictionary's scroll-padding-top: header, title and filters.
    jest.spyOn(window, "getComputedStyle").mockReturnValue({
      scrollPaddingTop: "203px",
    } as CSSStyleDeclaration);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    window.scrollTo = originalScrollTo;
  });

  describe("restoreScroll", () => {
    it("does nothing when the page has not moved", () => {
      setScrollY(3000);
      restoreScroll(createPinnedElement(147), 3000);
      expect(scrollTo).not.toHaveBeenCalled();
    });

    it("scrolls back when the element is pinned", () => {
      setScrollY(2616); // the browser's focus scroll
      restoreScroll(createPinnedElement(147), 3000);
      expect(scrollTo).toHaveBeenCalledTimes(1);
      expect(window.scrollY).toBe(3000);
    });

    it("keeps the browser's scroll when the element scrolls with the page", () => {
      // A search box that isn't sticky, partly under the header or off screen.
      setScrollY(2965);
      restoreScroll(createElementAt(3000), 3000);
      expect(scrollTo).toHaveBeenCalledTimes(2);
      expect(window.scrollY).toBe(2965);
    });
  });

  describe("keepScroll", () => {
    it("undoes a focus scroll that comes after the focus event, within the restore window", () => {
      setScrollY(3000);
      keepScroll(createPinnedElement(147), 3000);
      expect(scrollTo).not.toHaveBeenCalled();
      scrollPage(2955); // Safari scrolls after the focus event
      expect(window.scrollY).toBe(3000);
    });

    it("leaves the browser's scroll alone when the element is below the scroll padding", () => {
      // E.g. the search box below 1024px, where it isn't sticky.
      setScrollY(3000);
      keepScroll(createPinnedElement(260), 3000);
      scrollPage(2700); // e.g. Safari lifting a tapped input above the keyboard
      expect(scrollTo).not.toHaveBeenCalled();
      expect(window.scrollY).toBe(2700);
    });

    it("leaves later scrolls alone", () => {
      setScrollY(3000);
      keepScroll(createPinnedElement(147), 3000);
      jest.advanceTimersByTime(100);
      scrollPage(2500);
      expect(window.scrollY).toBe(2500);
    });
  });

  describe("trackScrollY", () => {
    it("tracks the scroll position until cleaned up", () => {
      setScrollY(100);
      const ref = { current: 0 };
      const cleanup = trackScrollY(ref);
      expect(ref.current).toBe(100);
      scrollPage(500);
      expect(ref.current).toBe(500);
      cleanup();
      scrollPage(900);
      expect(ref.current).toBe(500);
    });
  });

  describe("hook", () => {
    /**
     * Input whose focus handler comes from useKeepScrollOnFocus.
     * @param props - Component props.
     * @param props.onFocus - The input's own focus handler.
     * @returns The input.
     */
    const Input = ({
      onFocus,
    }: {
      onFocus?: FocusEventHandler<HTMLElement>;
    }): JSX.Element => {
      const onFocusKeepScroll = useKeepScrollOnFocus({ onFocus });
      return <input data-testid="input" onFocus={onFocusKeepScroll} />;
    };

    it("puts the page back where it was before the focus scroll, then calls the input's own handler", () => {
      const onFocus = jest.fn();
      render(<Input onFocus={onFocus} />);
      const input = screen.getByTestId("input");
      mockRect(input, () => 147);
      scrollPage(3000);
      setScrollY(2616); // Chrome scrolls before the focus event, without a scroll event yet
      fireEvent.focus(input);
      expect(window.scrollY).toBe(3000);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });
});

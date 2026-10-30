import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { useScrollWithPage } from "../src/components/Table/components/TableFeatures/ColumnFilter/hooks/UseScrollWithPage/hook";
import {
  closeAndRestoreFocus,
  isOutOfView,
  restoreFocus,
} from "../src/components/Table/components/TableFeatures/ColumnFilter/hooks/UseScrollWithPage/utils";
import { PROPERTY } from "../src/hooks/useHtmlStyle/constants";

const HEADER_HEIGHT = 56;

/**
 * Creates a button whose bounding rectangle spans the given vertical range.
 * @param top - Top of the button, from the top of the viewport.
 * @param bottom - Bottom of the button, from the top of the viewport.
 * @returns The button, attached to the document.
 */
function createButton(top: number, bottom: number): HTMLButtonElement {
  const button = document.createElement("button");
  document.body.appendChild(button);
  setRect(button, top, bottom);
  return button;
}

/**
 * Dispatches a scroll event on the window and runs the frame after it.
 */
function scrollPage(): void {
  act(() => {
    window.dispatchEvent(new Event("scroll"));
    jest.runOnlyPendingTimers();
  });
}

/**
 * Sets the element's bounding rectangle to the given vertical range, across the full viewport width.
 * @param element - Element to set the rectangle of.
 * @param top - Top of the element, from the top of the viewport.
 * @param bottom - Bottom of the element, from the top of the viewport.
 */
function setRect(element: Element, top: number, bottom: number): void {
  jest.spyOn(element, "getBoundingClientRect").mockReturnValue({
    bottom,
    height: bottom - top,
    left: 0,
    right: 100,
    toJSON: () => ({}),
    top,
    width: 100,
    x: 0,
    y: top,
  });
}

beforeEach(() => {
  jest.useFakeTimers();
  document.documentElement.style.setProperty(
    PROPERTY.HEADER_HEIGHT,
    `${HEADER_HEIGHT}px`,
  );
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
  document.documentElement.style.removeProperty(PROPERTY.HEADER_HEIGHT);
  document.body.innerHTML = "";
});

describe("isOutOfView", () => {
  it("should treat a missing element as out of view", () => {
    expect(isOutOfView(null)).toBe(true);
  });

  it("should treat an element below the header as in view", () => {
    expect(isOutOfView(createButton(100, 140))).toBe(false);
  });

  it("should treat an element whose top has reached the header as out of view", () => {
    expect(isOutOfView(createButton(40, 80))).toBe(true);
  });

  it("should treat an element above the viewport as out of view", () => {
    expect(isOutOfView(createButton(-80, -40))).toBe(true);
  });

  it("should treat an element below the viewport as out of view", () => {
    const top = window.innerHeight + 10;
    expect(isOutOfView(createButton(top, top + 40))).toBe(true);
  });

  it("should use the window's top edge when the header has not been measured", () => {
    document.documentElement.style.removeProperty(PROPERTY.HEADER_HEIGHT);
    expect(isOutOfView(createButton(10, 50))).toBe(false);
  });
});

describe("restoreFocus", () => {
  it("should focus the element on the next frame without scrolling", () => {
    const button = createButton(100, 140);
    const focus = jest.spyOn(button, "focus");

    restoreFocus(button);
    expect(focus).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
  });
});

describe("closeAndRestoreFocus", () => {
  it("should close the menu and then return focus to the button", () => {
    const button = createButton(100, 140);
    const onClose = jest.fn();

    closeAndRestoreFocus(onClose, button);
    jest.runOnlyPendingTimers();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(button);
  });
});

describe("useScrollWithPage", () => {
  it("should keep the menu open while its sticky button stays in view", () => {
    const anchorEl = createButton(100, 140);
    const onClose = jest.fn();
    renderHook(() => useScrollWithPage({ anchorEl, onClose, open: true }));

    scrollPage();

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should close the menu at once, and return focus to its button, once the button reaches the header", () => {
    const anchorEl = createButton(100, 140);
    const onClose = jest.fn();
    renderHook(() => useScrollWithPage({ anchorEl, onClose, open: true }));

    setRect(anchorEl, 10, 50);
    scrollPage();
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(anchorEl);
  });

  it("should close a menu closed by scrolling without its exit transition, and restore it on reopening", () => {
    const anchorEl = createButton(100, 140);
    const onClose = jest.fn();
    const { rerender, result } = renderHook(
      ({ open }) => useScrollWithPage({ anchorEl, onClose, open }),
      { initialProps: { open: true } },
    );
    expect(result.current.closeProps).toEqual({});

    setRect(anchorEl, 10, 50);
    scrollPage();
    expect(result.current.closeProps).toEqual({ transitionDuration: 0 });

    rerender({ open: false });
    setRect(anchorEl, 100, 140);
    rerender({ open: true });
    expect(result.current.closeProps).toEqual({});
  });

  it("should not listen for scrolling while the menu is closed", () => {
    const anchorEl = createButton(10, 50);
    const onClose = jest.fn();
    renderHook(() => useScrollWithPage({ anchorEl, onClose, open: false }));

    scrollPage();

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should stop listening once unmounted", () => {
    const anchorEl = createButton(100, 140);
    const onClose = jest.fn();
    const { unmount } = renderHook(() =>
      useScrollWithPage({ anchorEl, onClose, open: true }),
    );

    unmount();
    setRect(anchorEl, 10, 50);
    scrollPage();

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should keep the button as the menu's anchor after closing", () => {
    const button = createButton(100, 140);
    const onClose = jest.fn();
    const { rerender, result } = renderHook(
      ({ anchorEl, open }) => useScrollWithPage({ anchorEl, onClose, open }),
      {
        initialProps: {
          anchorEl: button as HTMLElement | null,
          open: true,
        },
      },
    );

    rerender({ anchorEl: null, open: false });

    expect(result.current.menuAnchorEl).toBe(button);
  });
});

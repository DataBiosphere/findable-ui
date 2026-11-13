import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ClampedContent } from "../src/components/Table/components/TableCell/components/ClampedContent/clampedContent";

const TEXT = "ANVIL_NIA_CARD_Coriell_Cell_Lines_Open";

function setHeights(
  element: HTMLElement,
  scrollHeight: number,
  clientHeight: number,
): void {
  Object.defineProperty(element, "scrollHeight", { value: scrollHeight });
  Object.defineProperty(element, "clientHeight", { value: clientHeight });
}

class MockPointerEvent extends MouseEvent {
  pointerType: string;

  constructor(type: string, params: PointerEventInit = {}) {
    super(type, params);
    this.pointerType = params.pointerType ?? "";
  }
}

window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;

let reportResize: () => void = () => undefined;
window.ResizeObserver = class {
  private targets = new Set<Element>();

  constructor(callback: ResizeObserverCallback) {
    reportResize = (): void =>
      callback(
        [...this.targets].map((target) => ({
          target,
        })) as ResizeObserverEntry[],
        this as unknown as ResizeObserver,
      );
  }

  disconnect(): void {
    this.targets.clear();
  }

  observe(target: Element): void {
    this.targets.add(target);
  }

  unobserve(target: Element): void {
    this.targets.delete(target);
  }
} as unknown as typeof ResizeObserver;

describe("ClampedContent", () => {
  it("returns the content as is without a maximum number of lines", () => {
    const { container } = render(<ClampedContent>{TEXT}</ClampedContent>);
    expect(container.innerHTML).toBe(TEXT);
  });

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("expands clamped content after a short hover", () => {
    render(<ClampedContent maxLines={2}>{TEXT}</ClampedContent>);
    const content = screen.getByText(TEXT);
    setHeights(content, 60, 40);
    fireEvent.pointerEnter(content, { pointerType: "mouse" });
    expect(screen.getAllByText(TEXT)).toHaveLength(1);
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getAllByText(TEXT)).toHaveLength(2);
    fireEvent.pointerLeave(content, { pointerType: "mouse" });
    act(() => jest.advanceTimersByTime(100));
    expect(screen.getAllByText(TEXT)).toHaveLength(1);
  });

  it("keeps the expanded content open while it is hovered", () => {
    render(<ClampedContent maxLines={2}>{TEXT}</ClampedContent>);
    const content = screen.getByText(TEXT);
    setHeights(content, 60, 40);
    fireEvent.pointerEnter(content, { pointerType: "mouse" });
    act(() => jest.advanceTimersByTime(300));
    const expanded = screen.getAllByText(TEXT)[1];
    fireEvent.pointerLeave(content, { pointerType: "mouse" });
    fireEvent.pointerEnter(expanded, { pointerType: "mouse" });
    act(() => jest.advanceTimersByTime(100));
    expect(screen.getAllByText(TEXT)).toHaveLength(2);
    fireEvent.pointerLeave(expanded, { pointerType: "mouse" });
    act(() => jest.advanceTimersByTime(100));
    expect(screen.getAllByText(TEXT)).toHaveLength(1);
  });

  it("does not expand for touch input", () => {
    render(<ClampedContent maxLines={2}>{TEXT}</ClampedContent>);
    const content = screen.getByText(TEXT);
    setHeights(content, 60, 40);
    fireEvent.pointerEnter(content, { pointerType: "touch" });
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getAllByText(TEXT)).toHaveLength(1);
  });

  it("makes clamped content focusable, and expands it on focus until Escape", () => {
    render(<ClampedContent maxLines={2}>{TEXT}</ClampedContent>);
    const content = screen.getByText(TEXT);
    setHeights(content, 60, 40);
    act(() => reportResize());
    expect(content).toHaveAttribute("tabindex", "0");
    act(() => content.focus());
    expect(screen.getAllByText(TEXT)).toHaveLength(2);
    fireEvent.keyDown(content, { key: "Escape" });
    act(() => jest.advanceTimersByTime(0));
    expect(screen.getAllByText(TEXT)).toHaveLength(1);
  });

  it("does not make content that fits focusable", () => {
    render(<ClampedContent maxLines={2}>{TEXT}</ClampedContent>);
    const content = screen.getByText(TEXT);
    setHeights(content, 40, 40);
    act(() => reportResize());
    expect(content).not.toHaveAttribute("tabindex");
  });

  it("does not expand content that fits", () => {
    render(<ClampedContent maxLines={2}>{TEXT}</ClampedContent>);
    const content = screen.getByText(TEXT);
    setHeights(content, 40, 40);
    fireEvent.pointerEnter(content, { pointerType: "mouse" });
    act(() => jest.advanceTimersByTime(300));
    expect(screen.getAllByText(TEXT)).toHaveLength(1);
  });
});

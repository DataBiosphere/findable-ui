import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useCloseOnEscape } from "../src/hooks/UseCloseOnEscape/hook";

/**
 * Dispatches a keydown event from the given target.
 * @param key - Key value.
 * @param target - Element to dispatch from; defaults to the document.
 */
function pressKey(key: string, target: EventTarget = document): void {
  target.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key }));
}

/**
 * Counts the hook's keydown listener registrations on the document.
 * @param spy - Spy on addEventListener or removeEventListener.
 * @returns Number of keydown registrations.
 */
function countKeydown(
  spy: jest.SpiedFunction<typeof document.addEventListener>,
): number {
  return spy.mock.calls.filter(([type]) => type === "keydown").length;
}

describe("useCloseOnEscape", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("calls onClose when Escape is pressed while open", () => {
    const onClose = jest.fn();
    renderHook(() => useCloseOnEscape({ onClose, open: true }));

    pressKey("Escape");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closed", () => {
    const onClose = jest.fn();
    renderHook(() => useCloseOnEscape({ onClose, open: false }));

    pressKey("Escape");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("ignores keys other than Escape", () => {
    const onClose = jest.fn();
    renderHook(() => useCloseOnEscape({ onClose, open: true }));

    pressKey("Enter");
    pressKey("a");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("detaches the listener when open becomes false", () => {
    const onClose = jest.fn();
    const { rerender } = renderHook(
      ({ open }) => useCloseOnEscape({ onClose, open }),
      { initialProps: { open: true } },
    );

    rerender({ open: false });
    pressKey("Escape");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("detaches the listener on unmount", () => {
    const onClose = jest.fn();
    const { unmount } = renderHook(() =>
      useCloseOnEscape({ onClose, open: true }),
    );

    unmount();
    pressKey("Escape");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls the latest onClose after the handler identity changes", () => {
    const first = jest.fn();
    const second = jest.fn();
    const { rerender } = renderHook(
      ({ onClose }) => useCloseOnEscape({ onClose, open: true }),
      { initialProps: { onClose: first } },
    );

    rerender({ onClose: second });
    pressKey("Escape");

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("attaches the listener once across renders that change onClose", () => {
    // Callers pass unmemoized handlers (see the filter Backdrop), so the
    // listener must not churn on every render.
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");
    const { rerender } = renderHook(
      ({ onClose }) => useCloseOnEscape({ onClose, open: true }),
      { initialProps: { onClose: jest.fn() } },
    );

    rerender({ onClose: jest.fn() });
    rerender({ onClose: jest.fn() });

    expect(countKeydown(addSpy)).toBe(1);
    expect(countKeydown(removeSpy)).toBe(0);
  });

  it("stops propagation so the event does not reach its target", () => {
    const onClose = jest.fn();
    const onTargetKeyDown = jest.fn();
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.addEventListener("keydown", onTargetKeyDown);
    renderHook(() => useCloseOnEscape({ onClose, open: true }));

    pressKey("Escape", input);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onTargetKeyDown).not.toHaveBeenCalled();

    input.remove();
  });
});

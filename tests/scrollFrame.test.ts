import { jest } from "@jest/globals";
import { onScrollFrame } from "../src/components/Filter/common/scrollFrame";

/**
 * Dispatches a scroll event on the window.
 */
function scroll(): void {
  window.dispatchEvent(new Event("scroll"));
}

describe("onScrollFrame", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should call the function once, on the frame after a burst of scroll events", () => {
    const onFrame = jest.fn();
    const remove = onScrollFrame(onFrame);

    scroll();
    scroll();
    scroll();
    expect(onFrame).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(onFrame).toHaveBeenCalledTimes(1);

    remove();
  });

  it("should stop listening, and cancel a pending frame, once removed", () => {
    const onFrame = jest.fn();
    const remove = onScrollFrame(onFrame);

    scroll();
    remove();
    jest.runOnlyPendingTimers();
    scroll();
    jest.runOnlyPendingTimers();

    expect(onFrame).not.toHaveBeenCalled();
  });

  it("should ignore scrolling inside the ignored element", () => {
    const onFrame = jest.fn();
    const panel = document.createElement("div");
    const list = document.createElement("div");
    panel.appendChild(list);
    document.body.appendChild(panel);
    const remove = onScrollFrame(onFrame, panel);

    list.dispatchEvent(new Event("scroll"));
    jest.runOnlyPendingTimers();
    expect(onFrame).not.toHaveBeenCalled();

    scroll();
    jest.runOnlyPendingTimers();
    expect(onFrame).toHaveBeenCalledTimes(1);

    remove();
    panel.remove();
  });
});

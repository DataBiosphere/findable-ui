import { jest } from "@jest/globals";
import { onScrollFrame } from "../src/utils/scrollFrame";

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
});

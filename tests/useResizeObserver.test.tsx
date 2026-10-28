import { jest } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import { type JSX, useRef } from "react";
import {
  getBorderBoxSizeHeight,
  useResizeObserver,
} from "../src/hooks/useResizeObserver";

interface MockObserver {
  callback: (entries: ResizeObserverEntry[]) => void;
  disconnect: jest.Mock;
  observe: jest.Mock;
}

let observers: MockObserver[] = [];
const originalResizeObserver = global.ResizeObserver;

/**
 * Element measured by useResizeObserver, showing the measured height.
 * @param props - Component props.
 * @param props.shouldObserve - Whether the observer is active.
 * @returns The measured element.
 */
const Measured = ({
  shouldObserve,
}: {
  shouldObserve?: boolean;
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const { height } =
    useResizeObserver(ref, getBorderBoxSizeHeight, shouldObserve) || {};
  return <div data-height={height ?? ""} data-testid="measured" ref={ref} />;
};

/**
 * Reports a new border box height to the most recent observer.
 * @param blockSize - Height in pixels.
 */
function reportHeight(blockSize: number): void {
  act(() => {
    observers[observers.length - 1].callback([
      { borderBoxSize: [{ blockSize, inlineSize: 0 }] },
    ] as unknown as ResizeObserverEntry[]);
  });
}

describe("useResizeObserver", () => {
  beforeEach(() => {
    observers = [];
    global.ResizeObserver = jest.fn(
      (callback: (entries: ResizeObserverEntry[]) => void) => {
        const observer = {
          callback,
          disconnect: jest.fn(),
          observe: jest.fn(),
        };
        observers.push(observer);
        return observer;
      },
    ) as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    global.ResizeObserver = originalResizeObserver;
  });

  it("should observe the ref's element on mount", () => {
    render(<Measured />);
    expect(observers).toHaveLength(1);
    expect(observers[0].observe).toHaveBeenCalledWith(
      screen.getByTestId("measured"),
    );
  });

  it("should return the size mapped from the reported entry", () => {
    render(<Measured />);
    reportHeight(120);
    expect(screen.getByTestId("measured").dataset.height).toBe("120");
  });

  it("should disconnect the observer on unmount", () => {
    const { unmount } = render(<Measured />);
    expect(observers[0].disconnect).not.toHaveBeenCalled();
    unmount();
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1);
  });

  it("should observe only while shouldObserve is true", () => {
    const { rerender } = render(<Measured shouldObserve={false} />);
    expect(observers).toHaveLength(0);
    rerender(<Measured shouldObserve />);
    expect(observers).toHaveLength(1);
    expect(observers[0].disconnect).not.toHaveBeenCalled();
    rerender(<Measured shouldObserve={false} />);
    expect(observers).toHaveLength(1);
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1);
  });
});

import { jest } from "@jest/globals";
import {
  applySlotId,
  mergeSlotProps,
  mergeSlotPropsRecords,
} from "../src/utils/slotProps";

interface TestProps {
  className?: string;
  id?: string;
  onClick?: () => void;
}

interface TestOwnerState {
  className?: string;
  open: boolean;
}

type TestSlotProps = TestProps | ((ownerState: TestOwnerState) => TestProps);

/**
 * Resolves merged slot props, failing the test if they are not a callback.
 * @param slotProps - Merged slot props.
 * @param ownerState - Owner state to resolve against.
 * @returns The props the callback derives from the owner state.
 */
function resolve(
  slotProps: TestSlotProps,
  ownerState: TestOwnerState,
): TestProps {
  if (typeof slotProps !== "function") throw new Error("Expected a callback");
  return slotProps(ownerState);
}

describe("applySlotId", () => {
  // The id is what a trigger's aria-controls points at, so it has to win.
  it("should apply the id over the slot props", () => {
    expect(
      applySlotId<TestSlotProps>("id", { className: "slot", id: "caller" }),
    ).toEqual({ className: "slot", id: "id" });
  });

  it("should accept absent slot props", () => {
    expect(applySlotId<TestSlotProps>("id", undefined)).toEqual({ id: "id" });
  });

  // id="" is an invalid attribute value that resolves to nothing.
  it("should not apply a blank or absent id", () => {
    expect(applySlotId<TestSlotProps>("", { className: "slot" })).toEqual({
      className: "slot",
    });
    expect(applySlotId<TestSlotProps>(undefined, undefined)).toEqual({});
  });

  it("should apply the id to a callback's result", () => {
    const slotProps = applySlotId<TestSlotProps>("id", ({ open }) => ({
      className: open ? "open" : "closed",
    }));
    expect(resolve(slotProps, { open: true })).toEqual({
      className: "open",
      id: "id",
    });
  });
});

describe("mergeSlotProps", () => {
  it("should let the external value win and join class names", () => {
    expect(
      mergeSlotProps<TestSlotProps>(
        { className: "external", id: "external" },
        { className: "default", id: "default" },
      ),
    ).toEqual({ className: "default external", id: "external" });
  });

  // MUI's helper reads keys off the default and throws on undefined.
  it("should accept an absent default", () => {
    expect(mergeSlotProps<TestSlotProps>({ id: "id" }, undefined)).toEqual({
      id: "id",
    });
  });

  it("should chain matching event handlers", () => {
    const external = jest.fn();
    const defaults = jest.fn();
    const merged = mergeSlotProps<TestSlotProps>(
      { onClick: external },
      { onClick: defaults },
    );
    if (typeof merged === "function") throw new Error("Expected an object");

    merged.onClick?.();

    expect(external).toHaveBeenCalledTimes(1);
    expect(defaults).toHaveBeenCalledTimes(1);
  });

  it("should resolve a callback against the owner state", () => {
    const merged = mergeSlotProps<TestSlotProps>(
      ({ open }) => ({ id: open ? "open" : "closed" }),
      { className: "default" },
    );
    expect(resolve(merged, { open: true })).toEqual({
      className: "default",
      id: "open",
    });
  });

  // A component's owner state carries its root className, which MUI's helper
  // would otherwise copy onto the slot.
  it("should not copy the owner state's className onto the slot", () => {
    const merged = mergeSlotProps<TestSlotProps>(
      () => ({ className: "external" }),
      { id: "id" },
    );
    expect(resolve(merged, { className: "root", open: true })).toEqual({
      className: "external",
      id: "id",
    });
  });

  // The adjustment above strips the root className from the merged result, not
  // from what a caller's callback sees: it must behave as it would when passed
  // straight to MUI.
  it("should pass the owner state's className to a callback unchanged", () => {
    const merged = mergeSlotProps<TestSlotProps>(
      ({ className }) => ({ id: className }),
      { id: "default" },
    );
    expect(resolve(merged, { className: "root", open: true })).toEqual({
      id: "root",
    });
  });

  it("should pass the owner state to a callback default", () => {
    const merged = mergeSlotProps<TestSlotProps>(
      { id: "external" },
      ({ open }) => ({
        className: open ? "open" : "closed",
      }),
    );
    expect(resolve(merged, { className: "root", open: false })).toEqual({
      className: "closed",
      id: "external",
    });
  });
});

describe("mergeSlotPropsRecords", () => {
  // Merging slot by slot means a default on one slot survives a caller setting
  // a different prop on that same slot.
  it("should merge each slot rather than replacing it", () => {
    expect(
      mergeSlotPropsRecords<Record<string, TestProps>>(
        { list: { id: "list" }, paper: { className: "default" } },
        { paper: { className: "caller" }, root: { id: "root" } },
      ),
    ).toEqual({
      list: { id: "list" },
      paper: { className: "default caller" },
      root: { id: "root" },
    });
  });

  it("should let later records win", () => {
    expect(
      mergeSlotPropsRecords<Record<string, TestProps>>(
        { paper: { id: "first" } },
        { paper: { id: "second" } },
        { paper: { id: "third" } },
      ),
    ).toEqual({ paper: { id: "third" } });
  });

  it("should skip absent records and undefined slots", () => {
    expect(
      mergeSlotPropsRecords<Record<string, TestProps | undefined>>(undefined, {
        list: undefined,
        paper: { id: "paper" },
      }),
    ).toEqual({ paper: { id: "paper" } });
  });
});

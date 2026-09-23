import { jest } from "@jest/globals";
import { mergeSlotProps } from "../src/utils/slotProps";

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
});

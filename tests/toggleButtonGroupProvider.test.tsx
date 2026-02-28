import { act, render, screen } from "@testing-library/react";
import React, { JSX } from "react";
import { ToggleButtonGroupProvider } from "../src/components/common/ToggleButtonGroup/provider/provider";
import { useToggleButtonGroup } from "../src/components/common/ToggleButtonGroup/provider/hook";

enum TEST_VALUE {
  OPTION_A = "OPTION_A",
  OPTION_B = "OPTION_B",
}

const TEST_ID_VALUE = "value";
const TEST_ID_BUTTON = "button";

/**
 * Test component that consumes the toggle button group context via hook.
 * @returns Test component.
 */
function TestConsumer(): JSX.Element {
  const { onChange, value } = useToggleButtonGroup<TEST_VALUE>();
  return (
    <div>
      <span data-testid={TEST_ID_VALUE}>{value ?? "null"}</span>
      <button
        data-testid={TEST_ID_BUTTON}
        onClick={(e) =>
          onChange?.(
            e as unknown as React.MouseEvent<HTMLElement>,
            TEST_VALUE.OPTION_B,
          )
        }
      >
        Change
      </button>
    </div>
  );
}

describe("ToggleButtonGroupProvider", () => {
  it("should render children", () => {
    render(
      <ToggleButtonGroupProvider>
        <div data-testid="child">child component</div>
      </ToggleButtonGroupProvider>,
    );

    expect(screen.getByTestId("child")).toBeTruthy();
  });

  it("should set initial value to null by default", () => {
    render(
      <ToggleButtonGroupProvider>
        <TestConsumer />
      </ToggleButtonGroupProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe("null");
  });

  it("should set initial value when provided", () => {
    render(
      <ToggleButtonGroupProvider<TEST_VALUE> initialValue={TEST_VALUE.OPTION_A}>
        <TestConsumer />
      </ToggleButtonGroupProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(
      TEST_VALUE.OPTION_A,
    );
  });

  it("should update value on onChange", () => {
    render(
      <ToggleButtonGroupProvider<TEST_VALUE> initialValue={TEST_VALUE.OPTION_A}>
        <TestConsumer />
      </ToggleButtonGroupProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(
      TEST_VALUE.OPTION_A,
    );

    act(() => {
      screen.getByTestId(TEST_ID_BUTTON).click();
    });

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(
      TEST_VALUE.OPTION_B,
    );
  });

  it("should pass props to render function children", () => {
    render(
      <ToggleButtonGroupProvider<TEST_VALUE> initialValue={TEST_VALUE.OPTION_A}>
        {({ onChange, value }) => (
          <div>
            <span data-testid={TEST_ID_VALUE}>{value}</span>
            <button
              data-testid={TEST_ID_BUTTON}
              onClick={(e) =>
                onChange?.(
                  e as unknown as React.MouseEvent<HTMLElement>,
                  TEST_VALUE.OPTION_B,
                )
              }
            >
              Change
            </button>
          </div>
        )}
      </ToggleButtonGroupProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(
      TEST_VALUE.OPTION_A,
    );

    act(() => {
      screen.getByTestId(TEST_ID_BUTTON).click();
    });

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(
      TEST_VALUE.OPTION_B,
    );
  });
});

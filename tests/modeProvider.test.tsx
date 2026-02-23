import { jest } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import React, { JSX } from "react";
import { MODE } from "../src/views/ExploreView/mode/types";

jest.unstable_mockModule("../src/hooks/useFeatureFlag/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}));

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(),
}));

const { useFeatureFlag } =
  await import("../src/hooks/useFeatureFlag/useFeatureFlag");
const { useConfig } = await import("../src/hooks/useConfig");
const { ModeProvider } =
  await import("../src/views/ExploreView/mode/provider/provider");
const { useMode } = await import("../src/views/ExploreView/mode/provider/hook");

const TEST_ID_VALUE = "value";
const TEST_ID_BUTTON = "button";
const TEST_ID_HAS_ONCHANGE = "has-onchange";

/**
 * Test component that consumes the mode context via hook.
 * @returns Test component.
 */
function TestConsumer(): JSX.Element {
  const { onChange, value } = useMode();
  return (
    <div>
      <span data-testid={TEST_ID_VALUE}>{value ?? "undefined"}</span>
      <span data-testid={TEST_ID_HAS_ONCHANGE}>
        {onChange ? "true" : "false"}
      </span>
      <button
        data-testid={TEST_ID_BUTTON}
        onClick={(e) =>
          onChange?.(
            e as unknown as React.MouseEvent<HTMLElement>,
            MODE.RESEARCH,
          )
        }
      >
        Change
      </button>
    </div>
  );
}

describe("ModeProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFeatureFlag as jest.Mock).mockReturnValue(false);
    (useConfig as jest.Mock).mockReturnValue({
      config: {},
    });
  });

  it("should render children", () => {
    render(
      <ModeProvider>
        <div data-testid="child">child component</div>
      </ModeProvider>,
    );

    expect(screen.getByTestId("child")).toBeTruthy();
  });

  it("should provide SEARCH value without onChange when disabled", () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(false);
    (useConfig as jest.Mock).mockReturnValue({
      config: {},
    });

    render(
      <ModeProvider>
        <TestConsumer />
      </ModeProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(MODE.SEARCH);
    expect(screen.getByTestId(TEST_ID_HAS_ONCHANGE).textContent).toBe("false");
  });

  it("should provide context with SEARCH as default when feature flag is enabled", () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(true);

    render(
      <ModeProvider>
        <TestConsumer />
      </ModeProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(MODE.SEARCH);
    expect(screen.getByTestId(TEST_ID_HAS_ONCHANGE).textContent).toBe("true");
  });

  it("should provide context when config.ai.enabled is true", () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(false);
    (useConfig as jest.Mock).mockReturnValue({
      config: {
        ai: {
          enabled: true,
        },
      },
    });

    render(
      <ModeProvider>
        <TestConsumer />
      </ModeProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(MODE.SEARCH);
    expect(screen.getByTestId(TEST_ID_HAS_ONCHANGE).textContent).toBe("true");
  });

  it("should provide context when either flag or config is enabled", () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(true);
    (useConfig as jest.Mock).mockReturnValue({
      config: {
        ai: {
          enabled: false,
        },
      },
    });

    render(
      <ModeProvider>
        <TestConsumer />
      </ModeProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(MODE.SEARCH);
    expect(screen.getByTestId(TEST_ID_HAS_ONCHANGE).textContent).toBe("true");
  });

  it("should update value on onChange when enabled", () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(true);

    render(
      <ModeProvider>
        <TestConsumer />
      </ModeProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(MODE.SEARCH);

    act(() => {
      screen.getByTestId(TEST_ID_BUTTON).click();
    });

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(MODE.RESEARCH);
  });

  it("should pass props to render function children when enabled", () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(true);

    render(
      <ModeProvider>
        {({ value }) => (
          <span data-testid={TEST_ID_VALUE}>{value ?? "undefined"}</span>
        )}
      </ModeProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(MODE.SEARCH);
  });

  it("should pass SEARCH value to render function children when disabled", () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(false);
    (useConfig as jest.Mock).mockReturnValue({
      config: {},
    });

    render(
      <ModeProvider>
        {({ value }) => (
          <span data-testid={TEST_ID_VALUE}>{value ?? "undefined"}</span>
        )}
      </ModeProvider>,
    );

    expect(screen.getByTestId(TEST_ID_VALUE).textContent).toBe(MODE.SEARCH);
  });
});

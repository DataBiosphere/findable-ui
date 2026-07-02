import { jest } from "@jest/globals";
import { act, fireEvent, render } from "@testing-library/react";
import { NextRouter } from "next/router";
import { JSX, ReactNode } from "react";

let mockAsPath = "/broken";

jest.unstable_mockModule("next/router", () => {
  return {
    ...jest.requireActual<typeof import("next/router")>("next/router"),
    useRouter: jest.fn(() => ({ asPath: mockAsPath })),
  };
});

const { useRouter } = await import("next/router");
const { ErrorBoundary } =
  await import("../src/components/ErrorBoundary/errorBoundary");

const MOCK_USE_ROUTER = useRouter as jest.MockedFunction<
  () => Partial<NextRouter>
>;

const ERROR_MESSAGE = "boom";

/**
 * Test component that throws during render.
 * @returns Never; always throws.
 */
function Thrower(): JSX.Element {
  throw new Error(ERROR_MESSAGE);
}

/**
 * Renders the fallback UI for a caught error.
 * @param props - Fallback render props.
 * @param props.error - The caught error.
 * @returns Fallback element.
 */
function fallbackRender({ error }: { error: Error }): ReactNode {
  return <div>Fallback: {error.message}</div>;
}

describe("ErrorBoundary", () => {
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

  beforeEach(() => {
    mockAsPath = "/broken";
    MOCK_USE_ROUTER.mockClear();
    // Suppress the expected React error boundary console output.
    consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders children when no error is thrown", () => {
    const { queryByText } = render(
      <ErrorBoundary fallbackRender={fallbackRender}>
        <div>Child content</div>
      </ErrorBoundary>,
    );
    expect(queryByText("Child content")).not.toBeNull();
  });

  it("renders the fallback when a child throws", () => {
    const { queryByText } = render(
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Thrower />
      </ErrorBoundary>,
    );
    expect(queryByText(`Fallback: ${ERROR_MESSAGE}`)).not.toBeNull();
  });

  it("resets and renders the new route when the route changes", () => {
    const { queryByText, rerender } = render(
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Thrower />
      </ErrorBoundary>,
    );
    expect(queryByText(`Fallback: ${ERROR_MESSAGE}`)).not.toBeNull();

    // Simulate navigation: the route changes and the new route renders a
    // working component in place of the thrower.
    mockAsPath = "/home";
    rerender(
      <ErrorBoundary fallbackRender={fallbackRender}>
        <div>Home page</div>
      </ErrorBoundary>,
    );

    expect(queryByText("Home page")).not.toBeNull();
    expect(queryByText(`Fallback: ${ERROR_MESSAGE}`)).toBeNull();
  });

  it("keeps showing the fallback when the route is unchanged", () => {
    const { queryByText, rerender } = render(
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Thrower />
      </ErrorBoundary>,
    );
    expect(queryByText(`Fallback: ${ERROR_MESSAGE}`)).not.toBeNull();

    // Re-render without a route change: the boundary must not reset.
    rerender(
      <ErrorBoundary fallbackRender={fallbackRender}>
        <div>Home page</div>
      </ErrorBoundary>,
    );

    expect(queryByText(`Fallback: ${ERROR_MESSAGE}`)).not.toBeNull();
    expect(queryByText("Home page")).toBeNull();
  });

  it("clears the error via the fallback reset callback without a route change", () => {
    let shouldThrow = true;

    /**
     * Throws until reset, then renders successfully.
     * @returns Recovered content once no longer throwing.
     */
    function ConditionalThrower(): JSX.Element {
      if (shouldThrow) throw new Error(ERROR_MESSAGE);
      return <div>Recovered</div>;
    }

    /**
     * Fallback exposing a button that stops throwing and calls reset.
     * @param props - Fallback render props.
     * @param props.reset - Clears the caught error.
     * @returns Fallback element with a retry button.
     */
    function fallbackWithReset({ reset }: { reset: () => void }): ReactNode {
      return (
        <button
          onClick={(): void => {
            shouldThrow = false;
            reset();
          }}
        >
          Retry
        </button>
      );
    }

    const { getByText, queryByText } = render(
      <ErrorBoundary fallbackRender={fallbackWithReset}>
        <ConditionalThrower />
      </ErrorBoundary>,
    );
    expect(getByText("Retry")).not.toBeNull();

    // asPath is unchanged, so recovery must come from the explicit reset
    // callback rather than the route-change reset.
    act(() => {
      fireEvent.click(getByText("Retry"));
    });

    expect(queryByText("Recovered")).not.toBeNull();
    expect(queryByText("Retry")).toBeNull();
  });
});

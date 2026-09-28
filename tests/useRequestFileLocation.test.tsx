import { jest } from "@jest/globals";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Component, JSX, ReactNode } from "react";
import { useRequestFileLocation } from "../src/hooks/useRequestFileLocation";

const ERROR_TEST_ID = "error";
const REQUEST_TEST_ID = "request";
const URL = "https://example.com/fetch/repository/file";

/**
 * Minimal error boundary: useAsync throws a rejected request during render.
 */
class TestErrorBoundary extends Component<
  { children: ReactNode },
  { error?: Error }
> {
  state: { error?: Error } = {};

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  render(): ReactNode {
    if (this.state.error) {
      return <div data-testid={ERROR_TEST_ID}>{this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

/**
 * Renders the hook's request state and exposes its run function.
 * @param props - Component props.
 * @param props.onRun - Receives the hook's run function.
 * @returns Request state element.
 */
function Request({ onRun }: { onRun: (run: () => void) => void }): JSX.Element {
  const { isLoading, run } = useRequestFileLocation(URL);
  onRun(run);
  return <div data-testid={REQUEST_TEST_ID}>{String(isLoading)}</div>;
}

describe("useRequestFileLocation", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    // React logs errors caught by the boundary.
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it.each([
    [
      "the fetch rejects",
      (): Promise<Response> => Promise.reject(new Error("Network error")),
      "Network error",
    ],
    [
      "the response is not JSON",
      (): Promise<Response> =>
        Promise.resolve({
          json: () => Promise.reject(new Error("Invalid JSON")),
        } as Response),
      "Invalid JSON",
    ],
  ])(
    "should reject the request, rather than leave it pending, when %s",
    async (_, fetchImpl, message) => {
      global.fetch = jest.fn(fetchImpl) as typeof fetch;
      let run: (() => void) | undefined;
      render(
        <TestErrorBoundary>
          <Request onRun={(r): void => void (run = r)} />
        </TestErrorBoundary>,
      );
      act(() => run?.());
      expect(screen.getByTestId(REQUEST_TEST_ID).textContent).toBe("true");
      await waitFor(() => {
        expect(screen.getByTestId(ERROR_TEST_ID).textContent).toBe(message);
      });
    },
  );
});

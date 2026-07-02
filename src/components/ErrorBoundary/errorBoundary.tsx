import { useRouter } from "next/router";
import { Component, JSX, PropsWithChildren, ReactNode } from "react";

interface ErrorBoundaryState {
  error?: Error;
}

interface FallbackRenderProps {
  error: Error;
  reset: () => void;
}

interface ErrorBoundaryProps {
  fallbackRender: (props: FallbackRenderProps) => ReactNode;
}

interface ErrorBoundaryClassProps extends ErrorBoundaryProps {
  resetKey: string;
}

type ErrorBoundaryPropsType = PropsWithChildren<ErrorBoundaryProps>;

type ErrorBoundaryClassPropsType = PropsWithChildren<ErrorBoundaryClassProps>;

class ErrorBoundaryClass extends Component<
  ErrorBoundaryClassPropsType,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryClassPropsType) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidUpdate(prevProps: ErrorBoundaryClassPropsType): void {
    // Reset the caught error when the route changes, so navigating away from
    // the error (e.g. via the "To Homepage" button) renders the new route
    // instead of remaining on the error screen.
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.reset();
    }
  }

  reset(): void {
    this.setState({ error: undefined });
  }

  render(): ReactNode {
    if (this.state.error) {
      const fallbackProps = { error: this.state.error, reset: this.reset };
      return this.props.fallbackRender(fallbackProps);
    }

    return this.props.children;
  }
}

/**
 * Error boundary that renders a fallback when a descendant throws during
 * render, and automatically resets when the route changes.
 * @param props - Component props.
 * @param props.children - Descendants guarded by the boundary.
 * @param props.fallbackRender - Renders the fallback UI for a caught error.
 * @returns Error boundary element.
 */
export function ErrorBoundary(props: ErrorBoundaryPropsType): JSX.Element {
  const { asPath } = useRouter();
  return <ErrorBoundaryClass {...props} resetKey={asPath} />;
}

import React, { PropsWithChildren, PropsWithRef } from "react";

interface ErrorBoundaryState {
  error?: Error;
}

interface FallbackRenderProps {
  error: Error;
  reset: () => void;
}

interface ErrorBoundaryProps {
  fallbackRender: (props: FallbackRenderProps) => React.ReactNode;
}

type ErrorBoundaryPropsType = PropsWithRef<
  PropsWithChildren<ErrorBoundaryProps>
>;

export class ErrorBoundary extends React.Component<
  ErrorBoundaryPropsType,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryPropsType) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  reset(): void {
    this.setState({});
  }

  render(): React.ReactNode {
    if (this.state.error) {
      const fallbackProps = { error: this.state.error, reset: this.render };
      return this.props.fallbackRender(fallbackProps);
    }

    return this.props.children;
  }
}

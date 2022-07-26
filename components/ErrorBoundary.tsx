import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: false;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;

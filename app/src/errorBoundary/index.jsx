import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    //eslint-disable-next-line
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", color: "red" }}>
          <h2>Something went wrong.</h2>
          <>
            <p>
              <strong>Error:</strong> {this.state.error.toString()}
            </p>
            <pre>{this.state.errorInfo?.componentStack}</pre>
          </>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

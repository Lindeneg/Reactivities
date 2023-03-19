import { Component, type ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryRequiredProps = Record<'children', ReactNode>;
type ErrorBoundaryRequiredState = Record<'hasError', boolean>;

// https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends Component<ErrorBoundaryRequiredProps, ErrorBoundaryRequiredState> {
    constructor(props: ErrorBoundaryRequiredProps) {
        super(props);

        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // TODO implement error log service to backend
        console.log('ErrorBoundary.componentDidCatch', { error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // TODO render error-page.tsx
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button type='button' onClick={() => this.setState({ hasError: false })}>
                        Try again?
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

import { Component, ReactNode } from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  errorText: string;
  componentStack: string;
  isClerkPublishableKeyError: boolean;
  clerkDashboardUrl: string | null;
};

const parseClerkDashboardUrl = (input: string): string | null => {
  const [match] = input.match(/https:\S+/) ?? [];
  if (!match) return null;
  return match.endsWith(".") ? match.slice(0, -1) : match;
};

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      errorText: "",
      componentStack: "",
      isClerkPublishableKeyError: false,
      clerkDashboardUrl: null,
    };
  }

  static getDerivedStateFromError(error: unknown): Partial<ErrorBoundaryState> {
    const errorText = error instanceof Error ? error.message : String(error);
    const isClerkPublishableKeyError =
      errorText.includes("@clerk/clerk-react") && errorText.includes("publishableKey");
    const clerkDashboardUrl = isClerkPublishableKeyError
      ? parseClerkDashboardUrl(errorText)
      : null;

    return {
      hasError: true,
      errorText,
      isClerkPublishableKeyError,
      clerkDashboardUrl,
    };
  }

  componentDidCatch(error: unknown, info: { componentStack: string }) {
    const errorText = error instanceof Error ? error.message : String(error);
    console.error("ErrorBoundary caught an error", error);
    this.setState({
      errorText,
      componentStack: info.componentStack || "",
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      errorText: "",
      componentStack: "",
      isClerkPublishableKeyError: false,
      clerkDashboardUrl: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto max-w-3xl px-4 py-10">
          <div className="flex flex-col gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-6">
            <h1 className="text-xl font-bold text-red-700">Something went wrong</h1>
            <p className="text-sm text-red-900/90">
              The app hit a runtime error while rendering. Use the details below to diagnose.
            </p>

            {this.state.isClerkPublishableKeyError ? (
              <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-4">
                <p className="text-sm font-medium text-amber-800">
                  Missing Clerk publishable key.
                </p>
                <p className="mt-2 text-sm text-amber-900/90">
                  Add <code>VITE_CLERK_PUBLISHABLE_KEY="&lt;your key&gt;"</code> to your
                  <code> .env.local</code> file.
                </p>
                {this.state.clerkDashboardUrl ? (
                  <p className="mt-2 text-sm">
                    Get it from{" "}
                    <a
                      className="underline hover:no-underline"
                      href={this.state.clerkDashboardUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {this.state.clerkDashboardUrl}
                    </a>
                  </p>
                ) : null}
              </div>
            ) : null}

            <details className="rounded-md border border-base-300 bg-base-100 p-3">
              <summary className="cursor-pointer text-sm font-medium">Error details</summary>
              <pre className="mt-3 whitespace-pre-wrap break-words text-xs">
                {this.state.errorText || "Unknown error"}
                {this.state.componentStack
                  ? `\n\nComponent stack:\n${this.state.componentStack}`
                  : ""}
              </pre>
            </details>

            <div className="flex flex-wrap gap-2">
              <button className="btn btn-sm btn-outline" onClick={this.handleReset}>
                Try again
              </button>
              <button className="btn btn-sm" onClick={() => window.location.reload()}>
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

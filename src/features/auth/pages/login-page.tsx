import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/login-form";

interface RedirectLocation {
  pathname?: string;
  search?: string;
  hash?: string;
}

interface LoginLocationState {
  from?: RedirectLocation;
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LoginLocationState | null;
  const from = state?.from;

  const redirectTo =
    from?.pathname?.startsWith("/") && !from.pathname.startsWith("//")
      ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
      : "/";

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
              W
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              WealthWise
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Your money. Your goals. Your future.
            </p>
          </div>

          <section
            aria-labelledby="login-heading"
            className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-7"
          >
            <div className="mb-6">
              <h2
                id="login-heading"
                className="text-xl font-semibold text-foreground"
              >
                Welcome back
              </h2>

              <p className="mt-1.5 text-sm text-muted-foreground">
                Sign in to manage your finances.
              </p>
            </div>

            <LoginForm
              onSuccess={() => navigate(redirectTo, { replace: true })}
            />
          </section>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Securely manage your financial future.
          </p>
        </div>
      </main>

      <footer className="border-t border-border bg-surface px-5 py-5">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} WealthWise. All rights reserved.</p>

          <nav
            aria-label="Legal information"
            className="flex items-center gap-5"
          >
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

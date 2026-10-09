import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AppHeader } from "../app-header/app-header";
import { Sidebar } from "../sidebar/sidebar";

export function AppLayout() {
  const location = useLocation();

  const [navigationOpenForPath, setNavigationOpenForPath] = useState<
    string | null
  >(null);

  const navigationOpen = navigationOpenForPath === location.pathname;

  function toggleNavigation() {
    setNavigationOpenForPath((currentPath) =>
      currentPath === location.pathname ? null : location.pathname,
    );
  }

  function closeNavigation() {
    setNavigationOpenForPath(null);
  }

  useEffect(() => {
    if (!navigationOpen) {
      return;
    }

    const dialogElement = document.getElementById("mobile-navigation");

    if (!(dialogElement instanceof HTMLElement)) {
      return;
    }

    const dialog: HTMLElement = dialogElement;

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(", "),
    );

    const firstElement = focusableElements.item(0);
    const lastElement = focusableElements.item(focusableElements.length - 1);

    firstElement?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setNavigationOpenForPath(null);
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      const activeElement = document.activeElement;
      const focusIsInsideDialog = dialog.contains(activeElement);

      if (
        event.shiftKey &&
        (activeElement === firstElement || !focusIsInsideDialog)
      ) {
        event.preventDefault();
        lastElement?.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement || !focusIsInsideDialog)
      ) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.getElementById("mobile-navigation-toggle")?.focus();
    };
  }, [navigationOpen]);

  useEffect(() => {
    if (!navigationOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [navigationOpen]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader
            navigationOpen={navigationOpen}
            onToggleNavigation={toggleNavigation}
          />

          {navigationOpen ? (
            <div className="fixed inset-0 z-40 md:hidden">
              <button
                type="button"
                aria-label="Dismiss navigation overlay"
                className="absolute inset-0 bg-slate-950/40"
                onClick={closeNavigation}
              />

              <div
                id="mobile-navigation"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className="absolute inset-y-0 left-0"
              >
                <Sidebar onNavigate={closeNavigation} />
              </div>
            </div>
          ) : null}

          <main className="min-w-0 flex-1 p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

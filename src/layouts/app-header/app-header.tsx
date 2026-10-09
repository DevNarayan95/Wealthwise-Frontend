import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button/button";
import { MenuIcon } from "../../components/ui/menu-icon/menu-icon";

interface AppHeaderProps {
  navigationOpen: boolean;
  onToggleNavigation: () => void;
}

export function AppHeader({
  navigationOpen,
  onToggleNavigation,
}: AppHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          id="mobile-navigation-toggle"
          variant="ghost"
          className="md:hidden"
          aria-label={navigationOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={navigationOpen}
          aria-controls="mobile-navigation"
          onClick={onToggleNavigation}
        >
          <MenuIcon open={navigationOpen} />
        </Button>

        <Link
          to="/"
          className="truncate text-sm font-medium text-slate-500 hover:text-foreground"
        >
          WealthWise
        </Link>
      </div>

      <span className="text-sm font-medium text-foreground">
        Personal Finance
      </span>
    </header>
  );
}

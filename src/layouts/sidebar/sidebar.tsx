import { NavLink } from "react-router-dom";

import { navigationItems } from "../../routes/navigation";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="text-xl font-bold text-primary">WealthWise</span>
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-medium",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-surface-muted hover:text-foreground",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border px-6 py-4">
        <p className="text-xs text-slate-500">Personal Finance</p>
      </div>
    </aside>
  );
}

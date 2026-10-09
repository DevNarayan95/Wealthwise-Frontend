interface MenuIconProps {
  open: boolean;
}

export function MenuIcon({ open }: MenuIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className="h-5 w-5"
    >
      {open ? (
        <path data-testid="close-icon-path" d="m6 6 12 12M18 6 6 18" />
      ) : (
        <path data-testid="menu-icon-path" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

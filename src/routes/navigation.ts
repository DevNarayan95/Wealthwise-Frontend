export interface NavigationItem {
  readonly label: string;
  readonly path: string;
}

export const navigationItems: readonly NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Accounts",
    path: "/accounts",
  },
  {
    label: "Transactions",
    path: "/transactions",
  },
];

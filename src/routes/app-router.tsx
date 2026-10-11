import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/login-page";
import { PublicLayout } from "../layouts/public-layout/public-layout";
import { HomePage } from "./home-page";
import { AccountsPage } from "../features/accounts/pages/accounts-page";
import { RequireAuth } from "../features/auth/guards/require-auth";
import { AppLayout } from "../layouts/app-layout/app-layout";
import { AccountDetailsPage } from "../features/accounts/pages/account-details-page";

export const appRouter = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/accounts", element: <AccountsPage /> },
          { path: "/accounts/:accountId", element: <AccountDetailsPage /> },
        ],
      },
    ],
  },
]);

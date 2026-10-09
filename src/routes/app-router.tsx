import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/login-page";
import { AppLayout } from "../layouts/app-layout/app-layout";
import { PublicLayout } from "../layouts/public-layout/public-layout";
import { HomePage } from "./home-page";

export const appRouter = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [],
  },
]);

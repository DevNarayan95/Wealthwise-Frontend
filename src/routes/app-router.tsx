import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../layouts/app-layout/app-layout";
import { PublicLayout } from "../layouts/public-layout/public-layout";
import { HomePage } from "./home-page";

export const appRouter = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [],
  },
]);

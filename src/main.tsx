import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppProvider } from "./app/app-provider";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);

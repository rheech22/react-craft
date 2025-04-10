import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import NotOptimizedVersion from "./NotOptimizedVersion.tsx";
import OptimizedVersion from "./OptimizedVersion.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OptimizedVersion />
  </StrictMode>,
);

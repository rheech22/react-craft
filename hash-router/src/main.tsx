import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import JSXRouteVersion from "./JSXRouteVersion";
//import ObjectRouteVersion from "./ObjectRouteVersion";

//createRoot(document.getElementById("root")!).render(
//  <StrictMode>
//    <ObjectRouteVersion />
//  </StrictMode>,
//);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JSXRouteVersion />
  </StrictMode>,
);

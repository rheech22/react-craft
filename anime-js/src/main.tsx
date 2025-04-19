import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import { Home } from "./pages/home";
import { Rotation } from "./pages/rotation";
import { Stagger } from "./pages/stagger";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rotation",
    element: <Rotation />,
  },
  {
    path: "/stagger",
    element: <Stagger />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import { Home } from "./pages/home";
import { Rotation } from "./pages/rotation";
import { Stagger } from "./pages/stagger";
import { Shuffle } from "./pages/shuffle";
import { Flip } from "./pages/flip";

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
  {
    path: "/shuffle",
    element: <Shuffle />,
  },
  {
    path: "/flip",
    element: <Flip />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

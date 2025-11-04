import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Option2 from "./pages/Option2.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const basename =
  import.meta.env.MODE === "production"
    ? "/financial-career-framework"
    : "/";

const router = createBrowserRouter(
  [
    { path: "/", element: <App />, errorElement: <ErrorPage /> },
    { path: "/option2", element: <Option2 />, errorElement: <ErrorPage /> },
    { path: "/about", element: <About />, errorElement: <ErrorPage /> },
    { path: "/contact", element: <Contact />, errorElement: <ErrorPage /> },
  ],
  { basename } // 👈 This is where you apply the base URL
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { router } from "./router"; // Ensure your router is properly set up
import { CharacterProvider } from "./context/CharacterContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CharacterProvider>
        <RouterProvider router={router} />
      </CharacterProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
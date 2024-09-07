import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
import "./index.css";
import ValuesProvider from "./providers/ValuesProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ValuesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ValuesProvider>
  </StrictMode>
);

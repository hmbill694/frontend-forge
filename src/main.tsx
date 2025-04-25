import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a memory history instance to initialize the router so it doesn't break when compiled:
const memoryHistory = createMemoryHistory({
  initialEntries: ["/"], // Pass your initial url
});

// Create a new router instance
export const router = createRouter({ routeTree, history: memoryHistory });

// Create a client
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);

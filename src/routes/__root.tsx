import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export type RootSearchParams = {
  projectId: number;
};

export const Route = createRootRoute({
  component: RootComponent,
  validateSearch: (search): RootSearchParams => {
    return {
      projectId: Number(search.projectId ?? -1),
    };
  },
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}

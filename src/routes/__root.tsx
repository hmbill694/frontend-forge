import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import MainLayout from "../lib/layout/main-layout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </React.Fragment>
  );
}

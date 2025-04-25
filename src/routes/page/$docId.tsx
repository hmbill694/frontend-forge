import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "../../lib/layout/main-layout";

export const Route = createFileRoute("/page/$docId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div>Hello "/page/$docId"!</div>
    </MainLayout>
  );
}

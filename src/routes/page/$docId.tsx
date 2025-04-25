import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/page/$docId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/page/$docId"!</div>;
}

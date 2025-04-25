import { createFileRoute } from "@tanstack/react-router";
import { GeneratePageForm } from "../lib/overview-page/generate-page-form";
import { GeneratedDocs } from "../lib/overview-page/generated-docs";
import MainLayout from "../lib/layout/main-layout";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useSearch();
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <h4 className="text-3xl font-semibold mb-4">Welcome to the Forge!</h4>
        <div className="bg-base-200 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Generate a new page!</h4>
          <p>
            Got an idea for a page. Belt it out below and we've see if we can
            smith it up. From there we can edit it together.
          </p>
          <GeneratePageForm projectId={projectId} />
        </div>
        <GeneratedDocs projectId={projectId} />
      </div>
    </MainLayout>
  );
}

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import type { SelectPage } from "../../../electron/db/schema";
import { Link } from "@tanstack/react-router";
export type GeneratedDocListProps = {
  projectId: number;
};

const ProjectNotSelected = () => {
  return (
    <div className="p-4">
      <div
        className={
          "grid grid-cols-3 gap-2 w-full max-w-3xs mx-auto" // Added for centering
        }
      >
        {Array.from({ length: 9 }).map((_, idx) => (
          <div className={"w-20 h-20 bg-base-300 rounded-md"} key={idx} />
        ))}
      </div>
      <div className="flex items-center justify-center m-4">
        Looks like you haven't selected a project yet. Do that and we can show
        you your generated pages.
      </div>
    </div>
  );
};

const GeneratedDocList: FC<{ pages: SelectPage[] }> = (props) => {
  return (
    <div>
      {props.pages.map((ele) => (
        <Link
          to="/page/$docId"
          params={{ docId: ele.id.toString() }}
          search={(curr) => ({ projectId: curr.projectId ?? -1 })}
        >
          <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{ele.name}</h2>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const GeneratedDocs: FC<GeneratedDocListProps> = (props) => {
  const { data = [] } = useQuery({
    queryKey: ["generated-docs", props.projectId],
    queryFn: () =>
      window.ipcRenderer.invoke(
        "get-generated-pages",
        props.projectId,
      ) as Promise<SelectPage[]>,
  });

  return (
    <div className="flex flex-col bg-base-200 p-6 rounded-lg">
      <h4 className="text-xl mb-3">Pages for this project</h4>
      <div>
        {props.projectId !== -1 ? (
          <GeneratedDocList pages={data} />
        ) : (
          <ProjectNotSelected />
        )}
      </div>
    </div>
  );
};

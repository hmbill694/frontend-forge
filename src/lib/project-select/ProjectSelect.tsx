import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { SelectProject } from "../../../electron/db/schema";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const ProjectSelect: FC = () => {
  const { projectId } = useSearch({ from: "/" });

  const navigate = useNavigate({ from: "/" });

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      window.ipcRenderer.invoke("get-projects") as Promise<SelectProject[]>,
  });

  const onSelect = (value: number) => {
    navigate({ search: { projectId: value } });
  };

  return (
    <select
      value={projectId}
      className="select select-ghost"
      onChange={(e) => onSelect(Number(e.target.value))}
    >
      <option value={-1} disabled={true}>
        Pick a project to work on
      </option>
      {data?.map((ele) => <option value={ele.id}>{ele.name}</option>)}
    </select>
  );
};

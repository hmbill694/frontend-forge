import { Link } from "@tanstack/react-router";
import { AddProject } from "../add-project/AddProject";
import { ProjectSelect } from "../project-select/ProjectSelect";

export default function NavBar() {
  return (
    <nav className="bg-base-300 text-white py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-xl font-semibold">Frontend Forge</p>
        <div className="space-x-4 flex">
          <Link
            to="/"
            search={(curr) => ({ projectId: curr.projectId ?? -1 })}
            className="btn btn-ghost hover:text-gray-200"
          >
            Home
          </Link>
          <ProjectSelect />
          <AddProject />
        </div>
      </div>
    </nav>
  );
}

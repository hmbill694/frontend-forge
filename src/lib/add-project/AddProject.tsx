import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";

const MODAL_ID = "create-project-modal";

export const AddProject: FC = () => {
  const [projectName, setProjectName] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return window.ipcRenderer.invoke("add-project", projectName);
    },
    onSuccess: () => {
      setProjectName("");
      // @ts-ignore IDK why typescript doesn't know about modals
      document.getElementById(MODAL_ID).close();
    },
  });

  return (
    <>
      <button
        className="btn btn-primary"
        // @ts-ignore IDK why typescript doesn't know about modals
        onClick={() => document.getElementById(MODAL_ID).showModal()}
      >
        Add a Project
      </button>
      <dialog id={MODAL_ID} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a project!</h3>
          <p className="py-4">
            Projects are the foundation of the forge. We will be able to build
            pages and associate components with a given project.
          </p>
          <input
            type="text"
            placeholder="Give your project a name"
            className="input"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate();
              }}
            >
              <button className="btn" disabled={isPending}>
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

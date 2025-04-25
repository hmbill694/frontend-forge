import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";

type GeneratePageFormProps = {
  projectId: number;
};

export const GeneratePageForm: FC<GeneratePageFormProps> = (props) => {
  const [input, setInput] = useState("");
  const { mutate } = useMutation({
    mutationFn: () => {
      return window.ipcRenderer.invoke("generate-html", input, props.projectId);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="chat" className="block text-sm font-bold mb-2">
          Prompt
        </label>
        <textarea
          id="chat"
          name="chat"
          rows={5}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={props.projectId === -1}
        ></textarea>
        <button
          className="btn btn-primary md:w-64"
          type="submit"
          disabled={props.projectId === -1}
        >
          Generate
        </button>
      </div>
    </form>
  );
};

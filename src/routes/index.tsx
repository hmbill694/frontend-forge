import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [state, setState] = useState("");
  const [input, setInput] = useState("");

  const { mutate } = useMutation({
    mutationFn: () => {
      return window.ipcRenderer.invoke("generate-html", input);
    },
    onSuccess: (res: string) => {
      setState(res);
    },
  });

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Welcome to T0</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="chat"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Prompt: {state}
          </label>
          <textarea
            id="chat"
            name="chat"
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Generate
          </button>
        </div>
      </form>
    </>
  );
}

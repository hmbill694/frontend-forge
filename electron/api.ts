import { ipcMain } from "electron";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import PageGeneratorAgentGraph from "./agent-graphs/generator-graph";
import { getGeneratedDocs, saveDocument } from "./services/generated-documents";
import { createProject, getProjects } from "./services/projects";

ipcMain.handle("hello-world", async () => {
  return "Hello world";
});

const agentModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  maxRetries: 2,
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

ipcMain.handle("get-projects", async () => {
  return getProjects();
});

ipcMain.handle("add-project", async (_, projectName) => {
  return createProject({ name: projectName });
});

ipcMain.handle(
  "generate-html",
  async (_, userInput: string, projectId: number) => {
    const htmlGeneratorGraph = PageGeneratorAgentGraph(agentModel);
    const { outputFileName, outputHtml } = await htmlGeneratorGraph.invoke({
      userInput,
    });

    await saveDocument({
      content: outputHtml,
      name: outputFileName,
      projectId,
    });

    return `The prompt was ${outputHtml}`;
  },
);

ipcMain.handle("get-generated-pages", async (_, projectId: number) => {
  return getGeneratedDocs({ projectId });
});

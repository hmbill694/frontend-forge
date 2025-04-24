import { ipcMain } from "electron";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import PageGeneratorAgentGraph from "./agent-graphs/generator-graph";
import { saveDocument } from "./services/generated-documents";

ipcMain.handle("hello-world", async () => {
  return "Hello world";
});

const agentModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  maxRetries: 2,
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

const htmlGeneratorGraph = PageGeneratorAgentGraph(agentModel);

ipcMain.handle("generate-html", async (_, userInput) => {
  const { outputFileName, outputHtml } = await htmlGeneratorGraph.invoke({
    userInput,
  });

  const doc = await saveDocument({
    content: outputHtml,
    name: outputFileName,
    projectId: 1,
  });

  return `The prompt was ${outputHtml}`;
});

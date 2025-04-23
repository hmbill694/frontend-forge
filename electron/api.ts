import { ipcMain } from "electron";

ipcMain.handle("hello-world", async () => {
  return "Hello world";
});

ipcMain.handle("generate-html", async (_, args) => {
  const prompt: string = args;

  return `The prompt was ${args}`;
});

import type { PageCreatorGraph } from "../agent-graphs/generator-graph";
import type { GraphStepFunction } from "../types";
import { generateDocName } from "../utils/doc-name-generator";
import fs from "fs";

export const writeToFile: GraphStepFunction<PageCreatorGraph> = async (
  state,
) => {
  if (!state.htmlIsValid) {
    throw new Error("There is no HTML to write to a file.");
  }

  const html =
    state.messages.at(-1)?.content.toString() ?? "No content to write to file.";

  const fileName = `${generateDocName()}`;

  const path = `public/out/${fileName}.html`;

  fs.writeFileSync(path, html);

  return { outputFileName: fileName, outputHtml: html };
};

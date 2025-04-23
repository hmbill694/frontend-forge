import type { PageCreatorGraph } from "../agent-graphs/generator-graph";
import { db } from "../db/client";
import { pages } from "../db/schema";
import type { GraphStepFunction } from "../types";

export const saveGeneratedDocument: GraphStepFunction<
  PageCreatorGraph
> = async (state) => {
  if (!state.outputHtml) {
    throw new Error("There is no output HTML to save.");
  }

  if (!state.htmlIsValid) {
    throw new Error("The provided html is not valid.");
  }

  if (!state.outputFileName) {
    throw new Error("There is not provided name for this document");
  }

  await db
    .insert(pages)
    .values({
      projectId: 0,
      content: state.outputHtml,
      name: state.outputFileName,
      createdAt: new Date(),
    });
  return state;
};

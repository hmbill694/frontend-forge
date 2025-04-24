import type { GraphStepFunction } from "../../shared/types";
import { Result } from "../../shared/utils/result";
import type { PageCreatorGraph } from "../agent-graphs/generator-graph";

export const htmlParserNode: GraphStepFunction<PageCreatorGraph> = async (
  state,
) => {
  const html = state.outputHtml;

  if (!html) {
    throw new Error(
      "Html parser node called when there is no messages to parse",
    );
  }

  // TODO: IMPLEMENT THIS
  const parsed = Result.fromFallible(() => "");

  if (parsed.isError()) {
    throw new Error(parsed.getError());
  }

  return { htmlIsValid: true };
};

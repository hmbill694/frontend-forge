import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { BaseMessage } from "@langchain/core/messages";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { htmlGenerator } from "../steps/html-generator";
import { htmlParserNode } from "../steps/html-parser";

export type PageCreatorGraph = {
  messages: BaseMessage[];
  htmlIsValid: Boolean;
  userInput: string;
  outputHtml?: string;
  outputFileName?: string;
};

function initGraphState() {
  return Annotation.Root({
    // Define a 'messages' channel to store an array of BaseMessage objects
    messages: Annotation<BaseMessage[]>({
      // Reducer function: Combines the current state with new messages
      reducer: (currentState, updateValue) => currentState.concat(updateValue),
      // Default function: Initialize the channel with an empty array
      default: () => [],
    }),
    userInput: Annotation<string>,
    htmlIsValid: Annotation<Boolean>,
    outputHtml: Annotation<string>,
    outputFileName: Annotation<string>,
  });
}

export default function PageGeneratorAgentGraph<
  Model extends BaseChatModel = BaseChatModel,
>(llm: Model) {
  const workflow = new StateGraph(initGraphState())
    .addNode("query-node", htmlGenerator(llm))
    .addNode("html-validator", htmlParserNode)
    .addEdge(START, "query-node")
    .addEdge("query-node", "html-validator")
    .addEdge("html-validator", END);

  return workflow.compile();
}

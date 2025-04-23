import { END, START, StateGraph } from "@langchain/langgraph"
import { htmlGenerator } from "../steps/html-generator"
import { htmlParserNode } from "../steps/html-parser"
import { writeToFile } from "../steps/file-writter"
import type { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

export type PageCreatorGraph = { messages: BaseMessage[], htmlIsValid: Boolean, userInput: string, outputHtml?: string, outputFileName?: string }

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
    outputFileName: Annotation<string>
  });
}


export default function PageGeneratorAgentGraph<Model extends BaseChatModel = BaseChatModel>(llm: Model ) {
  const workflow = new StateGraph(initGraphState())
    .addNode("query-node", htmlGenerator(llm))
    .addNode("html-validator", htmlParserNode)
    .addNode("file-writter", writeToFile)
    .addEdge(START, "query-node")
    .addEdge("query-node", "html-validator")
    .addEdge("html-validator", "file-writter")
    .addEdge("file-writter", END)

    return workflow.compile()
}

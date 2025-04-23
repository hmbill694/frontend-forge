import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

export type DefaultGraphState = { [key: string]: any }

export type GraphStepFunction<GraphState = DefaultGraphState> =
 (state: GraphState) => Promise<Partial<GraphState>>

export type GraphStepFunctionWithModel<Graph = DefaultGraphState, Model extends BaseChatModel = BaseChatModel,> =
 (llm: Model) => GraphStepFunction<Graph>

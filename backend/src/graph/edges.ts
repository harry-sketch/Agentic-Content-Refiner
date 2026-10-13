import { AIMessage } from "langchain";
import type { TStateType } from "../types/types.ts";

export const shouldContinue = (state: TStateType) => {
  const lastMessage = state.messages[state.messages.length - 1];

  const aiMsg = AIMessage.isInstance(lastMessage);

  if (aiMsg && (lastMessage.tool_calls ?? "")?.length > 0) {
    return "reflactor_node";
  }

  return "end";
};

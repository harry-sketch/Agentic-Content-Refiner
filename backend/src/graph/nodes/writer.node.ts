import { SystemMessage, trimMessages } from "langchain";
import { model } from "../../llm/groq.model.ts";
import { SYSTEM_PROMPT } from "../../prompts/prompts.ts";
import type { TStateType } from "../../types/types.ts";

export const writerNode = async (state: TStateType) => {
  const trim = await trimMessages(state.messages, {
    maxTokens: 6,
    tokenCounter: (msg) => msg.length,
    startOn: "human",
    strategy: "last",
  });

  const resp = await model.invoke([new SystemMessage(SYSTEM_PROMPT), ...trim]);

  return {
    messages: [resp],
  };
};

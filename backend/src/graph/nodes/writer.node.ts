import { trimMessages } from "langchain";
import type { TStateType } from "../../types/types.ts";

export const writerNode = (state: TStateType) => {
  const trim = trimMessages(state.messages, {
    maxTokens: 6,
    tokenCounter: (msg) => msg.length,
    startOn: "human",
    strategy: "last",
  });

  return state;
};

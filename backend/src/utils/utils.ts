import type { HumanMessage, SystemMessage } from "langchain";
import { model } from "../llm/groq.model";

export const config = {
  configurable: {
    thread_id: "1",
  },
};

export const MAX_REVISONS = 2;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const invokeWithRetry = async (
  messages: (SystemMessage | HumanMessage)[],
  maxRetries = 3,
) => {
  for (let attempt = 0; ; attempt++) {
    try {
      return await model.invoke(messages);
    } catch (error: any) {
      if (error?.status !== 429 || attempt >= maxRetries) {
        throw error;
      }

      const retryAfter = Number(error?.headers?.get?.("retry-after"));

      const waitMs =
        retryAfter > 0 ? retryAfter * 1000 + 500 : 2000 * 2 ** attempt;

      console.log(
        `Rate limit reached. Retrying in ${Math.ceil(waitMs / 1000)}s...`,
      );

      await sleep(waitMs);
    }
  }
};

import { HumanMessage, SystemMessage } from "langchain";
import { REFLACTOR_SYSTEM_PROMPT } from "../../prompts/prompts.ts";
import type { TStateType } from "../../types/types.ts";
import { invokeWithRetry } from "../../utils/utils.ts";

export const reflactorNode = async (state: TStateType) => {
  const lastMsg = state.messages.at(-1);

  const user_prompt = `
       Review the following job outreach draft.

      Original request: 
      ${lastMsg?.content ?? ""}

      Check the draft for clarity, personalization, accuracy,
      professional tone, concision, and a clear call to action.
      
      Return actionable revision feedback only.
      Draft: ${state.draft}
   `;

  try {
    const resp = await invokeWithRetry([
      new SystemMessage(REFLACTOR_SYSTEM_PROMPT),
      new HumanMessage(user_prompt),
    ]);

    return {
      feedback: String(resp.content),
      revisionCnt: (state.revisionCnt ?? 0) + 1,
    };
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};

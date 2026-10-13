import { HumanMessage, SystemMessage } from "langchain";
import { SYSTEM_PROMPT } from "../../prompts/prompts.ts";
import type { TStateType } from "../../types/types.ts";
import { invokeWithRetry } from "../../utils/utils.ts";

export const writerNode = async (state: TStateType) => {
  const isRevision = Boolean(state.draft);

  const user_prompt = isRevision
    ? `Original request:
       ${state.question}

       Previous draft:
       ${state.draft}

       Critic feedback:
       ${state.feedback}

       Revise the previous draft using the feedback.
       Return exactly ONE complete, ready-to-send email.
       Do not provide alternatives, explanations, or placeholders.`
    : `Write exactly ONE cold email for this request:
      ${state.question}

      Return only the complete, ready-to-send email.`;

  try {
    const resp = await invokeWithRetry([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(user_prompt),
    ]);

    return {
      draft: String(resp.content),
      feedback: "",
    };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

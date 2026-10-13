import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { HumanMessage } from "langchain";
import { config } from "../utils/utils.ts";
import { app } from "./workflow.ts";

export const runWorkflow = async () => {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    while (true) {
      const question = await rl.question("You: ");

      if (["thanks", "bye"].includes(question.toLowerCase().trim())) {
        break;
      }

      const completions = await app.invoke(
        { question, messages: [new HumanMessage(question)] },
        config,
      );

      const aiMsg = completions.draft;

      console.log(`Writer: ${aiMsg}`);
    }
  } catch (error) {
    console.log("Someting went wrong while workflow is running", error);
  } finally {
    rl.close();
  }
};

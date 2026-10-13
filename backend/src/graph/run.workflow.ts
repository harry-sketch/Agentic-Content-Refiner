import { HumanMessage } from "langchain";
import { config } from "../utils/utils.ts";
import { app } from "./workflow.ts";

export const runWorkflow = async () => {
  try {
    const stream = await app.stream(
      { messages: new HumanMessage("Hii") },
      config,
    );

    for await (const s of stream) {
      console.log("--STEP--->");
      console.log(s);
      console.log("--STEP---->");
    }
  } catch (error) {
    console.log("Someting went wrong while workflow is running", error);
  }
};
